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
from openapi.decorators import login_required_api
from django.utils.decorators import method_decorator

from rest_framework import serializers as serial
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import MyUser
from .models import Novel, ChatLog, NovelStory
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
    if request.method == "GET":
        novel = get_object_or_404(Novel, pk=novel_id)
        character_fields = ["name", "personality"]
        novel_story_fields = ["page", "content", "image"]
        background_fields = ["genre", "time_period", "time_projection", "summary"]

        character_data = list(novel.novel_character.values(*character_fields))
        novel_story_data = list(novel.novel_story.values(*novel_story_fields))
        background_data = list(novel.novel_background.values(*background_fields))

        serialized_data = {
            # "novel": serial.serialize("python", [novel]),
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
        novelStory = NovelStory.objects.filter(novel_id=novel_id).last()
        # Retrieve the parsed result from the latest assistant's response
        for log in reversed(chat_logs):
            if log.role == "assistant":
                answer = log.chat_log
                novel_content = ""
                choices = []
                parsing_choices = False

                for line in answer.split("\n"):
                    line = line.strip()
                    if line.startswith("A") or line.startswith("1"):
                        parsing_choices = True
                        choices.append(line[2:])
                    elif parsing_choices:
                        choices.append(line[2:])
                    else:
                        novel_content += line + '\n'
                return JsonResponse({
                    'story': novel_content,
                    'choices': choices[:2],
                    'image': novelStory.image
                })
        return JsonResponse({
            'message': 'No parsed result found for the given novel_id.'
        })
    def post(self, request, novel_id):
        print(request.data)
        input_data = request.data.get('input_field')
        if (input_data == "end"):
            input_data = "여기서 소설 작성을 멈추고 결말을 작성해주세요."
        print(input_data)
        chat_log = ChatLog(novel_id=novel_id, role="user", chat_log=input_data)
        chat_log.save()
        response_message = send_message(input_data, novel_id)
        print(send_message)
        # 응답 본문에 챗봇의 응답 포함
        response_data = {
            "code": response_message
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

    message_content = response_message['response_message']  # 챗봇의 응답 메시지 가져오기
    image_url = response_message['image_url']


    for log in messages:
        if log["role"] == "user":
            chat_log = ChatLog(novel_id=novel_id, role="user", chat_log=log["content"])
        elif log["role"] == "assistant":
            chat_log = ChatLog(
                novel_id=novel_id, role="assistant", chat_log=log["content"]
            )
        chat_log.save()

    processed_data = process_data(message_content)
    return render(request, 'chat_with_history.html', {'result': processed_data, 'response_message': message_content, 'image_url': image_url})
  

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

    system_instructions = [
        'You are a helpful assistant.',
        'Please write a novel in Korean',
        'You write a novel, and you give the user a choice in the middle of the novel',#소설을 써내려가다 소설 중간에 사용자에게 선택지를 줘
        'Give me a choice and stop the novel you were you were writing',#선택지를 주면 너가쓰던 소설을 멈춰
        'When a user chooses a choice, he or she writes a novel based on the choice', #사용자가 선택지를 선택하면 그 선택지를 바탕으로 소설을 이어써줘
        'Use English capital letters instead of numbers for the options.', #옵션에는 숫자 대신 영문 대문자를 사용합니다. -
        'Please add a space before the English capitalization of each option.', #각 옵션의 영문 대문자 앞에 공백을 추가하십시오. 
        'When a choice comes out, make sure that the English capital letter corresponding to the choice comes out immediately after the line change comes out', #-선택지가 나오면, 선택지에 해당하는 영문 대문자가 라인변경이 나온 직후에 나오도록 한다
        'After the user makes a choice, do not reveal their selection again.', #사용자가 선택한 후에는 선택한 항목을 다시 표시하지 않습니다 - 
        'If the user selects a choice, continue the novel based on the selected option.', #사용자가 선택한 항목을 선택한 경우 선택한 옵션을 기준으로 소설을 계속합니다.
        'If the user chooses three choices, the novel is finished', #사용자가 선택지를 세 가지 선택을 하면 소설이 완성됩니다
        "When writing a novel, please include a description of the character's conversation or situation", #소설을 쓸 때는 등장인물의 대화나 상황에 대한 설명을 넣어주세요
        "Please don't include GPT API answers asking you to choose one option after the novel is finished", #소설내용이 끝난뒤 선택지 하나를 골라달라는 GPT API 답변은 넣지 말아줘
        "Please don't include the GPT API answer asking you to choose one option"
    ]

    chat_logs = load_chat_logs(novel_id)
    messages = [
        {"role": "system", "content": instruction}
        for instruction in system_instructions
    ]

    for log in chat_logs:
        messages.append({"role": log.role, "content": log.chat_log})

    if len(messages) == 12:
        messages.append({'role': 'user', 'content': message})

    novel_instance = Novel.objects.get(id=novel_id)
    characters = novel_instance.novel_character.all()
    backgrounds = novel_instance.novel_background.all()

    for character in characters:
        character_data = {
            "role": "assistant",
            "content": f"Character Name: {character.name}, Personality: {character.personality}",
        }
        messages.append(character_data)

    # Append background data to messages
    for background in backgrounds:
        background_data = {
            "role": "assistant",
            "content": f"Genre: {background.genre}, Time Period: {background.time_period}, Time Projection: {background.time_projection}, Summary: {background.summary}",
        }
        messages.append(background_data)

    # Send message to GPT API
    data = {"model": "gpt-3.5-turbo", "messages": messages, "temperature": 1.0}
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        response_json = response.json()
        answer = response_json["choices"][0]["message"]["content"]
        if answer.startswith('A') or answer.startswith(' A'):
            answer = answer[2:]
        print(answer)
        chat_log = ChatLog(novel_id=novel_id, role='assistant', chat_log=answer)
        chat_log.save()
        
        page_number = NovelStory.objects.filter(novel_id=novel_id).count()+1
        image_url = dalleIMG(answer)
        novel_story = NovelStory.objects.create(novel_id=novel_id, page=page_number, content=answer, image=image_url)
        novel_story.save()
        print(messages)
        return 200
    
    except requests.exceptions.RequestException as e:
        print("An error occurred while sending the request:", str(e))
        return {"response_message": "An error occurred while processing your request."}


class init_setting_APIView(APIView):
    @swagger_auto_schema(
        request_body=NovelBackgroundRequestSerializer,
        responses={status.HTTP_201_CREATED: BackgroundResponseSerializer},
    )
    @method_decorator(login_required_api)
    def post(self, request):
        # 요청할 때 입력한 정보들로 serializer를 생성한다
        data = request.data.copy()
        data["user"] = MyUser.objects.get(id=1).id
        novel_serializer = NovelSerializer(data=data)
        background_serializer = BackgroundSerializer(data=data)
        character_array = data["character"]
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

    aws_s3_download_url = os.environ.get('AWS_S3_DOWNLOAD_URL', 'default_url')
    image_s3_url = f'{aws_s3_download_url}/{s3_filename}'


    return image_s3_url


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


@api_view(["POST"])
@method_decorator(login_required_api)
def my_api_view(request):
    if request.method == "POST":
        return Response({"success": "소설 만드셔도 됩니다"}, status=200)

class TestServer(APIView):
    def get(self, request, novel_id):
        data = NovelStory.objects.filter(novel_id=novel_id).values()
        novel = Novel.objects.get(id=novel_id)
        res = {
            "novel_name": novel.novel_name,
            "cover": novel.novel_image,
            "novelStory": data
        }
        # serial = ResultPageSerializer(data=res, many=True)
        # if serial.is_valid():
        #     return Response(serial.data, status=200)
        return Response(res, status=200)