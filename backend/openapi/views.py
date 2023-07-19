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



@api_view(['GET', 'POST'])
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
        return process_data
    else:
        return ""


@csrf_exempt
def input_form(request, novel_id):
    if request.method == 'POST':
        print('Received POST request in input_form')
        input_data = request.POST.get('input_field', '')
        response_message = send_message(input_data, novel_id)
        processed_data = process_data(response_message)

        chat_log = ChatLog(novel_id=novel_id, role='user', chat_log=input_data)
        chat_log.save()

        # 응답 본문에 챗봇의 응답 포함
        response_data = {
            'input': input_data,
            'response': response_message['response_message']
        }
        return JsonResponse(response_data)
    else:
        return HttpResponse("Invalid request method")


# 함수 설명: 사용자가 전달한 메시지를 받아와 send_message 함수로 전달한 후, 챗봇의 응답을 HTTP 응답으로 반환
# chat 함수
@csrf_exempt
def chat(request):
    message = request.GET.get("message", "")
    response_message = send_message(message)  # novel_id
    return HttpResponse(response_message)


@csrf_exempt

def load_chat_logs(novel_id):
    chat_logs = ChatLog.objects.filter(novel_id=novel_id).order_by('id')
    return chat_logs


@csrf_exempt
def chat_with_history(request, novel_id):
    message = request.POST.get('message', '')

    chat_logs = load_chat_logs(novel_id)
    messages = [
        {'role': 'system', 'content': 'You are a helpful assistant.'},
    ]
    for log in chat_logs:
        if log.role == 'user':
            messages.append({'role': 'user', 'content': log.chat_log})
        elif log.role == 'assistant':
            messages.append({'role': 'assistant', 'content': log.chat_log})

    messages.append({'role': 'user', 'content': message})

    response_message = send_message(messages, novel_id)  # novel_id를 send_message 함수로 전달
    message_content = response_message['response_message']  # 챗봇의 응답 메시지 가져오기

    for log in messages:
        if log['role'] == 'user':
            chat_log = ChatLog(novel_id=novel_id, role='user', chat_log=log['content'])
        elif log['role'] == 'assistant':
            chat_log = ChatLog(novel_id=novel_id, role='assistant', chat_log=log['content'])
        chat_log.save()

    processed_data = process_data(message_content)
    return render(request, 'chat_with_history.html', {'result': processed_data, 'response_message': message_content})

@csrf_exempt
def get_parsed_result(request, novel_id):
    chat_logs = load_chat_logs(novel_id)
    # Retrieve the parsed result from the latest assistant's response
    for log in reversed(chat_logs):
        if log.role == 'assistant':
            answer = log.chat_log
            novel_content = ''
            choices = []
            parsing_choices = False

            for line in answer.split('\n'):
                line = line.strip()
                if line.startswith('A'):
                    parsing_choices = True
                    choices.append(line)
                elif parsing_choices:
                    choices.append(line)
                else:
                    novel_content += line + '\n'
    print(choices)
    return JsonResponse({
        'response_message': answer,
        'response_content': novel_content,
        'choices': choices
    })

    return JsonResponse({
        'message': 'No parsed result found for the given novel_id.'
    })


# send_message 함수는 ChatGPT API를 사용하여 메시지를 보내고, 챗봇의 응답을 반환
@csrf_exempt

def send_message(message, novel_id):  # novel_id를 매개변수로 추가
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f'Bearer {os.getenv("OPENAI_SECRET_KEY")}',
        "Content-Type": "application/json",
    }
    chat_logs = load_chat_logs(novel_id)
    messages = [
        {'role': 'system', 'content': 'You are a helpful assistant.'},
        {'role': 'user', 'content': message},
    ]
    for log in chat_logs:
        messages.append({'role': log.role, 'content': log.chat_log})

    # Send message to GPT API
    data = {
        'model': 'gpt-3.5-turbo',
        'messages': messages,
        'temperature': 1.0
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # 4xx 또는 5xx 상태 코드에 대한 예외 발생
        response_json = response.json()  # 서버로부터 받은 응답을 JSON 형식으로 파싱

        # 챗봇의 응답을 가져와서 messages 리스트에 추가합니다
        answer = response_json["choices"][0]["message"]["content"]


        chat_log = ChatLog(novel_id=novel_id, role='assistant', chat_log=answer)
        chat_log.save()

        return {
            'response_message': answer
        }
    except requests.exceptions.RequestException as e:
        print('An error occurred while sending the request:', str(e))

    return {
        'response_message': 'Error occurred while sending the request',
    }

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

