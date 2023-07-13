import os
import requests
from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
from .models import ChatLog
from django.views.decorators.csrf import csrf_exempt


# 입력 데이터를 처리하는 로직을 구현 
# 예시로 입력 데이터를 대문자로 변환하는 간단한 예시를 제공
@csrf_exempt
def process_data(input_data):
    if input_data is not None and input_data != '':
        processed_data = input_data.upper()
        return processed_data
    else:
        return ''

# 함수 설명: 입력 폼에서 제출된 데이터를 받아와 process_data 함수로 전달하여 처리한 뒤 결과를 템플릿에 전달
@csrf_exempt
def input_form(request):
    if request.method == 'POST':
        input_data = request.POST.get('input_field', '')
        # 메시지를 챗봇에 보내고 응답을 받아옵니다
        novel_id = request.POST.get('novel_id', '')
        response_message = send_message(input_data, novel_id)
        # 챗봇 응답을 처리하고 필요한 형식으로 변환합니다
        processed_data = process_data(response_message)
        # 템플릿에 결과를 전달합니다
        return render(request, 'input_form.html', {'result': processed_data, 'response_message': response_message})
    else:
        return render(request, 'input_form.html')


# 함수 설명: 사용자가 전달한 메시지를 받아와 send_message 함수로 전달한 후, 챗봇의 응답을 HTTP 응답으로 반환
# chat 함수
@csrf_exempt
def chat(request):
    message = request.GET.get('message', '')
    novel_id = request.GET.get('novel_id', None) # 소설의 id를 받아옴
    response_message = send_message(message, novel_id)
    return HttpResponse(response_message)


# send_message 함수는 ChatGPT API를 사용하여 메시지를 보내고, 챗봇의 응답을 반환
@csrf_exempt
def send_message(message, novel_id): # novel_id를 매개변수로 추가
    url = 'https://api.openai.com/v1/chat/completions'
    headers = {
        'Authorization': f'Bearer {os.getenv("OPENAI_SECRET_KEY")}',
        'Content-Type': 'application/json'
    }
    data = {
        'model': 'gpt-3.5-turbo',
        'messages': [
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': message},
            {'role': 'system', 'content': ' '},  # 빈 시스템 메시지 추가
            {'role': 'novel_id', 'content': novel_id}  # novel_id 매개변수를 추가
        ],
        'temperature': 1.0
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # 4xx 또는 5xx 상태 코드에 대한 예외 발생
        response_json = response.json()  # 서버로부터 받은 응답을 JSON 형식으로 파싱

        # 챗봇의 응답을 가져와서 messages 리스트에 추가합니다
        answer = response_json['choices'][0]['message']['content']
        data['messages'].append({'role': 'assistant', 'content': answer})

        previous_chat_logs = ChatLog.objects.filter(novel_id=novel_id).values_list('chat_log', flat=True) # 해당 소설의 chat_log목록을 가져 온다
        for chat_log in previous_chat_logs:
            data['messages'].append({'role': 'assistant', 'content': chat_log})

        chat_log = ChatLog(chat_log=answer, novel_id=novel_id)  # 새로운 ChatLog 인스턴스 생성
        chat_log.save()

        return answer
    except requests.exceptions.RequestException as e:
        print('An error occurred while sending the request:', str(e))