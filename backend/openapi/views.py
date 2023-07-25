import os
import random
import requests
import datetime
from io import BytesIO

import boto3
from PIL import Image

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.core.paginator import Paginator, EmptyPage
from django.conf import settings

from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import MyUser
from .models import Novel, ChatLog
from .QuestionList import getFirstQuestion
from openapi.serializers import (
    BackgroundSerializer,
    CharacterSerializer,
    NovelSerializer,
    BackgroundResponseSerializer,
    NovelBackgroundRequestSerializer,
)

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import openai


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "id",
            openapi.IN_HEADER,
            description="ID of the user who owns the novels",
            type=openapi.TYPE_STRING,
        ),
        openapi.Parameter(
            "page",
            openapi.IN_QUERY,
            description="novel list page",
            type=openapi.TYPE_INTEGER,
        ),
    ],
)
@api_view(["GET"])
def mynovel_list(request):
    """
    list all the novels
    ---
    security:
        - api_key: []
    parameters:
        - name: id
          description: ID of the user who owns the novels
          required: true
          type: string
          paramType: header
    """
    if request.method == "GET":
        per_page = 12  # 페이지당 노벨 수
        id_param = request.META.get("HTTP_ID")
        novels = Novel.objects.filter(user_id=id_param).order_by("-create_at")

        paginator = Paginator(novels, per_page)
        page_number = request.GET.get("page", "1")  # 요청한 페이지 번호를 가져옴

        try:
            page_obj = paginator.page(page_number)
            serializer = NovelSerializer(page_obj, many=True)

            data = {
                "novel": serializer.data,
                "meta": {
                    "page": page_obj.number,
                    "pages": paginator.num_pages,
                    "prev_page": page_obj.previous_page_number()
                    if page_obj.has_previous()
                    else None,
                    "next_page": page_obj.next_page_number()
                    if page_obj.has_next()
                    else None,
                    "has_next": page_obj.has_next(),
                    "has_prev": page_obj.has_previous(),
                },
            }

            return Response(data, status=status.HTTP_200_OK)

        except EmptyPage:
            return Response(
                {"error": "Invalid page number"}, status=status.HTTP_400_BAD_REQUEST
            )


@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "page",
            openapi.IN_QUERY,
            description="novel list page",
            type=openapi.TYPE_INTEGER,
        ),
    ],
)
@api_view(["GET"])
def novel_list(request):
    """
    list all the novels
    ---
    security:
        - api_key: []
    parameters:
        - name: page
          description: novel list page
          required: false
          type: integer
          paramType: query
    """
    if request.method == "GET":
        per_page = 12  # 페이지당 노벨 수
        novels = Novel.objects.filter().order_by("-create_at")

        paginator = Paginator(novels, per_page)
        page_number = request.GET.get("page", "1")  # 요청한 페이지 번호를 가져옴

        try:
            page_obj = paginator.page(page_number)
            serializer = NovelSerializer(page_obj, many=True)

            data = {
                "novel": serializer.data,
                "meta": {
                    "page": page_obj.number,
                    "pages": paginator.num_pages,
                    "prev_page": page_obj.previous_page_number()
                    if page_obj.has_previous()
                    else None,
                    "next_page": page_obj.next_page_number()
                    if page_obj.has_next()
                    else None,
                    "has_next": page_obj.has_next(),
                    "has_prev": page_obj.has_previous(),
                },
            }

            return Response(data, status=status.HTTP_200_OK)

        except EmptyPage:
            return Response(
                {"error": "Invalid page number"}, status=status.HTTP_400_BAD_REQUEST
            )


@swagger_auto_schema(
    methods=["GET", "DELETE"],
    manual_parameters=[
        openapi.Parameter(
            "HTTP_ID",
            openapi.IN_HEADER,
            description="ID of the user who owns the novels",
            type=openapi.TYPE_STRING,
        )
    ],
)
@api_view(["GET", "DELETE"])
def mynovels(request, novel_id):
    """
    Retrieve or delete a novel
    ---
    security:
        - api_key: []
    parameters:
        - name: novel_id
        description: ID of the novel to be retrieved or deleted
        required: true
        type: integer
        paramType: path
        - name: id
        description: ID of the user who owns the novel
        required: true
        type: string
        paramType: header
    """
    if request.method == "GET":
        novel = get_object_or_404(Novel, pk=novel_id)
        character_fields = ["name", "personality"]
        novel_story_fields = ["page", "content", "image"]
        background_fields = ["genre", "time_period", "time_projection", "summary"]

        character_data = list(novel.novel_character.values(*character_fields))
        novel_story_data = list(novel.novel_story.values(*novel_story_fields))
        background_data = list(novel.novel_background.values(*background_fields))

        serialized_data = {
            "novel": serializers.serialize("python", [novel]),
            "characters": character_data,
            "novel_stories": novel_story_data,
            "backgrounds": background_data,
        }

        return Response(serialized_data, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        try:
            novel = Novel.objects.get(pk=novel_id)
            if request.META.get("HTTP_ID") != str(novel.user.id):
                return JsonResponse({"error": "삭제권한이 없습니다."}, status=403)
            novel.delete()
            return JsonResponse({"success": "소설이 성공적으로 삭제되었습니다."}, status=200)
        except Novel.DoesNotExist:
            return JsonResponse({"error": "해당 ID를 가진 소설이 존재하지 않습니다."}, status=404)
    else:
        return JsonResponse({"error": "이 메소드는 허용되지 않습니다."}, status=405)


class NovelView(APIView):
    def get(self, request, novel_id):
        chat_logs = load_chat_logs(novel_id)
        # Retrieve the parsed result from the latest assistant's response
        for log in reversed(chat_logs):
            if log.role == "assistant":
                answer = log.chat_log
                novel_content = ""
                choices = []
                parsing_choices = False

                for line in answer.split("\n"):
                    line = line.strip()
                    if line.startswith("A"):
                        parsing_choices = True
                        choices.append(line)
                    elif parsing_choices:
                        choices.append(line)
                    else:
                        novel_content += line + "\n"
                return JsonResponse(
                    {
                        "response_message": answer,
                        "response_content": novel_content,
                        "choices": choices,
                    }
                )
        return JsonResponse(
            {"message": "No parsed result found for the given novel_id."}
        )

    def post(self, request, novel_id):
        input_data = request.POST.get("input_field", "")
        chat_log = ChatLog(novel_id=novel_id, role="user", chat_log=input_data)
        chat_log.save()
        response_message = send_message(input_data, novel_id)
        # 응답 본문에 챗봇의 응답 포함
        response_data = {
            "input": input_data,
            "response": response_message["response_message"],
        }
        return JsonResponse(response_data)


# 함수 설명: 사용자가 전달한 메시지를 받아와 send_message 함수로 전달한 후, 챗봇의 응답을 HTTP 응답으로 반환
# chat 함수
@csrf_exempt
def chat(request):
    message = request.GET.get("message", "")
    response_message = send_message(message)  # novel_id
    return HttpResponse(response_message)


@csrf_exempt
def load_chat_logs(novel_id):
    chat_logs = ChatLog.objects.filter(novel_id=novel_id, role="assistant").last()
    print(chat_logs)
    return chat_logs


@csrf_exempt
def chat_with_history(request, novel_id):
    message = request.POST.get("message", "")

    chat_logs = load_chat_logs(novel_id)
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
    ]
    for log in chat_logs:
        if log.role == "user":
            messages.append({"role": "user", "content": log.chat_log})
        elif log.role == "assistant":
            messages.append({"role": "assistant", "content": log.chat_log})

    messages.append({"role": "user", "content": message})

    response_message = send_message(messages, novel_id)  # novel_id를 send_message 함수로 전달
    message_content = response_message["response_message"]  # 챗봇의 응답 메시지 가져오기

    for log in messages:
        if log["role"] == "user":
            chat_log = ChatLog(novel_id=novel_id, role="user", chat_log=log["content"])
        elif log["role"] == "assistant":
            chat_log = ChatLog(
                novel_id=novel_id, role="assistant", chat_log=log["content"]
            )
        chat_log.save()

    processed_data = process_data(message_content)
    return render(
        request,
        "chat_with_history.html",
        {"result": processed_data, "response_message": message_content},
    )


@csrf_exempt
def load_chat_logs(novel_id):
    chat_logs = ChatLog.objects.filter(novel_id=novel_id).order_by("create_at")
    return chat_logs


# send_message 함수는 ChatGPT API를 사용하여 메시지를 보내고, 챗봇의 응답을 반환
@csrf_exempt
def send_message(message, novel_id):  # novel_id를 매개변수로 추가
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f'Bearer {os.getenv("OPENAI_SECRET_KEY")}',
        "Content-Type": "application/json",
    }
    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    chat_logs = load_chat_logs(novel_id)
    for log in chat_logs:
        messages.append({"role": log.role, "content": log.chat_log})
    if len(messages) == 1:
        messages.append({"role": "user", "content": message})
    print(messages)
    # Send message to GPT API
    data = {"model": "gpt-3.5-turbo", "messages": messages, "temperature": 1.0}
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # 4xx 또는 5xx 상태 코드에 대한 예외 발생
        response_json = response.json()  # 서버로부터 받은 응답을 JSON 형식으로 파싱
        # 챗봇의 응답을 가져와서 messages 리스트에 추가합니다
        answer = response_json["choices"][0]["message"]["content"]

        chat_log = ChatLog(novel_id=novel_id, role="assistant", chat_log=answer)
        chat_log.save()
        print(answer)
        return {"response_message": answer}
    except requests.exceptions.RequestException as e:
        print("An error occurred while sending the request:", str(e))

        return answer


class init_setting_APIView(APIView):
    @swagger_auto_schema(
        request_body=NovelBackgroundRequestSerializer,
        responses={status.HTTP_201_CREATED: BackgroundResponseSerializer},
    )
    def post(self, request):
        # 요청할 때 입력한 정보들로 serializer를 생성한다
        data = request.data.copy()
        data["user"] = MyUser.objects.get(id=1).id
        novel_serializer = NovelSerializer(data=data)
        background_serializer = BackgroundSerializer(data=data)
        character_array = request.data["character"]
        if novel_serializer.is_valid():
            novel_instance = novel_serializer.save()
            if background_serializer.is_valid():
                if novel_instance is not None:
                    background_serializer.validated_data["novel"] = novel_instance
                    background_serializer.save()
            for character_data in character_array:
                character_serializer = CharacterSerializer(data=character_data)
                if character_serializer.is_valid():
                    character_serializer.validated_data["novel"] = novel_instance
                    character_serializer.save()
                else:
                    return Response(
                        {
                            "error": "Invalid character data",
                            "character_data": character_data,
                        },
                        status=400,
                    )
            response_data = {"novel": novel_instance.id}
            message = getFirstQuestion(
                data["genre"],
                data["time_period"],
                data["time_projection"],
                data["summary"],
                data["character"],
            )
            send_message(message, novel_instance.id)
            return Response(response_data, status=201)
        else:
            return Response({"error": novel_serializer.errors}, status=400)


def dalleIMG(query):
    OPENAI_API_KEY = os.getenv("OPENAI_SECRET_KEY")

    # openai API 키 인증
    openai.api_key = OPENAI_API_KEY

    # 모델 - GPT 3.5 Turbo 선택
    model = "gpt-3.5-turbo"

    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant who is good at translating.",
        },
        {"role": "assistant", "content": query},
    ]

    # 사용자 메시지 추가
    messages.append({"role": "user", "content": "영어로 번역해주세요."})

    # ChatGPT API 호출하기
    response = openai.ChatCompletion.create(model=model, messages=messages)
    answer3 = response["choices"][0]["message"]["content"]
    print(answer3)

    # 새 메시지 구성
    messages = [
        {
            "role": "system",
            "content": "You are an assistant who is good at creating prompts for image creation.",
        },
        {"role": "assistant", "content": answer3},
    ]

    # 사용자 메시지 추가
    messages.append(
        {
            "role": "user",
            "content": "Condense up to 4 outward description to focus on nouns and adjectives separated by ,",
        }
    )

    # ChatGPT API 호출하기
    response = openai.ChatCompletion.create(model=model, messages=messages)
    answer4 = response["choices"][0]["message"]["content"]
    print(answer4)

    # 이미지 생성을 위한 프롬프트
    params = ", concept art, realistic lighting, ultra-detailed, 8K, photorealism, digital art"
    prompt = f"{answer4}{params}"
    print(prompt)

    response = openai.Image.create(prompt=prompt, n=1, size="512x512")
    image_url = response["data"][0]["url"]
    print(image_url)

    # 이미지 다운로드
    res = requests.get(image_url)
    if res.status_code != 200:
        return JsonResponse({"error": "Failed to download image"}, status=400)

    # 이미지 열기
    img = Image.open(BytesIO(res.content))

    # S3에 이미지 저장
    # 고유한 키 이름 생성
    now = datetime.datetime.now()
    random_suffix = random.randint(1000, 9999)
    s3_filename = f'images/{now.strftime("%Y-%m-%d-%H-%M-%S")}_{random_suffix}.png'

    s3_bucket = "team-a-s3-bucket"

    save_image_to_s3(img, s3_bucket, s3_filename)

    # 저장된 이미지의 URL 생성
    image_s3_url = f"{settings.AWS_S3_ENDPOINT_URL}/{s3_bucket}/{s3_filename}"

    # JSON 형식으로 응답 반환
    return JsonResponse({"image_url": image_s3_url})


def save_image_to_s3(image, bucket_name, file_name):
    try:
        # S3에 이미지 업로드
        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
            endpoint_url=settings.AWS_S3_ENDPOINT_URL,
        )
        with BytesIO() as output:
            image.save(output, format="PNG")
            output.seek(0)
            s3.upload_fileobj(output, bucket_name, file_name)
        print(
            f"Image saved successfully to S3 bucket: {bucket_name}, with file name: {file_name}"
        )
        return True
    except Exception as e:
        print(f"Failed to save image to S3: {str(e)}")
        return False
