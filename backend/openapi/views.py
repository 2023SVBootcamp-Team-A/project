import os
import requests
from django.http import HttpResponse
from .models import Novel
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse
from .models import ChatLog
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from openapi.serializers import (
    BackgroundSerializer,
    CharacterSerializer,
    NovelSerializer,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework import status


class NovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = "__all__"


@api_view(["GET"])
def novel_list(request):
    if request.method == "GET":
        id_param = request.META.get("HTTP_ID")
        novels = Novel.objects.filter(user_id=id_param).order_by("-create_at")

        serializer = NovelSerializer(novels, many=True)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
def mynovels(request, novel_id):
    if request.method == "GET":
        novel = get_object_or_404(Novel, pk=novel_id)
        # 각 모델에 대한 필드 리스트
        character_fields = ["name", "personality"]
        novel_story_fields = ["page", "content", "image"]
        background_fields = ["genre", "time_period", "time_projection", "summary"]

        # 해당 속성값을 딕셔너리로 가져오기
        character_data = list(novel.novel_character.values(*character_fields))
        novel_story_data = list(novel.novel_story.values(*novel_story_fields))
        background_data = list(novel.novel_background.values(*background_fields))

        # 필드 리스트를 포함하여 직렬화된 데이터 생성
        serialized_data = {
            "novel": serializers.serialize("python", [novel]),
            "characters": character_data,
            "novel_stories": novel_story_data,
            "backgrounds": background_data,
        }

        # JSON으로 변환
        return Response(serialized_data, status=status.HTTP_200_OK)
    if request.method == "DELETE":
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


# 입력 데이터를 처리하는 로직을 구현
# 예시로 입력 데이터를 대문자로 변환하는 간단한 예시를 제공
@csrf_exempt
def process_data(input_data):
    if input_data is not None and input_data != "":
        processed_data = input_data.upper()
        return processed_data
    else:
        return ""


# 함수 설명: 입력 폼에서 제출된 데이터를 받아와 process_data 함수로 전달하여 처리한 뒤 결과를 템플릿에 전달
@csrf_exempt
def input_form(request):
    if request.method == "POST":
        input_data = request.POST.get("input_field", "")
        # 메시지를 챗봇에 보내고 응답을 받아옵니다
        response_message = send_message(
            input_data,
        )
        # 챗봇 응답을 처리하고 필요한 형식으로 변환합니다
        processed_data = process_data(response_message)
        # 템플릿에 결과를 전달합니다
        return render(
            request,
            "input_form.html",
            {"result": processed_data, "response_message": response_message},
        )
    else:
        return render(request, "input_form.html")


# 함수 설명: 사용자가 전달한 메시지를 받아와 send_message 함수로 전달한 후, 챗봇의 응답을 HTTP 응답으로 반환
# chat 함수
@csrf_exempt
def chat(request):
    message = request.GET.get("message", "")
    response_message = send_message(message)  # novel_id
    return HttpResponse(response_message)


@csrf_exempt
def load_chat_logs():
    chat_logs = ChatLog.objects.all().values_list("chat_log", flat=True)


def load_chat_logs(novel_id):
    chat_logs = ChatLog.objects.filter(novel_id=novel_id).values_list(
        "chat_log", flat=True
    )
    return list(chat_logs)


# send_message 함수는 ChatGPT API를 사용하여 메시지를 보내고, 챗봇의 응답을 반환
@csrf_exempt
def send_message(message):  # novel_id를 매개변수로 추가
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f'Bearer {os.getenv("OPENAI_SECRET_KEY")}',
        "Content-Type": "application/json",
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message},
            {"role": "system", "content": " "},  # 빈 시스템 메시지 추가
        ],
        "temperature": 1.0,
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # 4xx 또는 5xx 상태 코드에 대한 예외 발생
        response_json = response.json()  # 서버로부터 받은 응답을 JSON 형식으로 파싱

        # 챗봇의 응답을 가져와서 messages 리스트에 추가합니다
        answer = response_json["choices"][0]["message"]["content"]
        data["messages"].append({"role": "assistant", "content": answer})

        chat_log = ChatLog(chat_log=message)
        chat_log.save()
        chat_log = ChatLog(chat_log=answer)
        chat_log.save()

        return answer
    except requests.exceptions.RequestException as e:
        print("An error occurred while sending the request:", str(e))


@csrf_exempt
def chat_with_history(request):
    message = request.GET.get("message", "")

    print("An error occurred while sending the request:", str(e))


@csrf_exempt
def chat_with_history(request, novel_id):
    message = request.GET.get("message", "")

    # 이전 대화 기록을 가져와서 messages 리스트에 추가
    chat_logs = load_chat_logs(novel_id)
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": message},
        {"role": "system", "content": " "},  # 빈 시스템 메시지 추가
    ]
    for log in chat_logs:
        messages.append({"role": "user", "content": log})
        messages.append(
            {"role": "assistant", "content": log}
        )  # 이전 응답 기록을 추가하는 대신 이전 사용자 메시지를 추가

        messages.append({"role": "user", "content": log})
        messages.append(
            {"role": "assistant", "content": log}
        )  # 이전 응답 기록을 추가하는 대신 이전 사용자 메시지를 추가
    messages.append({"role": "user", "content": message})

    # 현재 사용자 메시지를 전달하고 응답을 받음
    response_message = send_message(message)

    # 챗봇 응답을 처리하고 필요한 형식으로 변환
    processed_data = process_data(response_message)

    # DB에 새로운 대화 기록 저장
    chat_log = ChatLog(chat_log=message, novel_id=novel_id)
    chat_log.save()
    chat_log = ChatLog(chat_log=response_message, novel_id=novel_id)
    chat_log.save()

    # 템플릿에 결과를 전달
    return render(
        request,
        "chat_with_history.html",
        {"result": processed_data, "response_message": response_message},
    )


class init_setting_APIView(APIView):
    def post(self, request):
        # 요청할 때 입력한 정보들로 serializer를 생성한다
        background_serializer = BackgroundSerializer(data=request.data)
        character_serializer = CharacterSerializer(data=request.data)
        # novel_serializer = NovelSerializer(data=request.data)
        # novel_instance = None

        # if novel_serializer.is_valid():
        #     novel_instance = novel_serializer.save()

        # serializer의 데이터 유효성 검사를 마치면,
        # novel_id에 해당하는 novel 객체를 가지고 오고
        # background와 character serializer에 novel_id를 입력한다
        if background_serializer.is_valid() and character_serializer.is_valid():
            # if novel_instance is not None:
            #     background_serializer.validated_data["novel"] = novel_instance.id
            #     character_serializer.validated_data["novel"] = novel_instance.id
            background_instance = background_serializer.save(novel_id=100)
            character_instance = character_serializer.save(novel_id=100)

            # 위의 과정이 모두 올바르게 작동할 시 novel_id를 반환한다
            response_data = {"novel": "success"}
            return Response(response_data, status=201)
        else:
            return Response({"error": "invalied data"}, status=400)
