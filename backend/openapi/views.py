import os
import requests
from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
from .models import ChatLog
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Max


# 입력 데이터를 처리하는 로직을 구현 
# 예시로 입력 데이터를 대문자로 변환하는 간단한 예시를 제공
@csrf_exempt
def process_data(input_data):
    if input_data is not None and input_data != '':
        return input_data
# 입력 데이터를 처리하는 로직을 구현
# 예시로 입력 데이터를 대문자로 변환하는 간단한 예시를 제공

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
    message = request.GET.get('message', '')
    response_message = send_message(message)
    return HttpResponse(response_message)


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

from django.http import JsonResponse

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

            return JsonResponse({
                'response_message': answer,
                'response_content': novel_content,
                'choices': choices
            })

    return JsonResponse({
        'message': 'No parsed result found for the given novel_id.'
    })


@csrf_exempt
def load_chat_logs():
    chat_logs = ChatLog.objects.all().values_list("chat_log", flat=True)
    return list(chat_logs)


# send_message 함수는 ChatGPT API를 사용하여 메시지를 보내고, 챗봇의 응답을 반환
@csrf_exempt
def send_message(message, novel_id):  # novel_id를 매개변수로 추가
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

    # Load chat logs
    chat_logs = load_chat_logs(novel_id)
    novel_id=1
    # Prepare messages list with previous chat logs and current message
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
        response.raise_for_status()
        response_json = response.json()

        # Get assistant's response
        answer = response_json['choices'][0]['message']['content']

        # Save the assistant's response to the database
        chat_log = ChatLog(novel_id=novel_id, role='assistant', chat_log=answer)
        chat_log.save()

        return {'response_message': answer}

    except requests.exceptions.RequestException as e:
        print('An error occurred while sending the request:', str(e))

        return {'response_message': 'Error occurred while sending the request'}
        # 챗봇의 응답을 가져와서 messages 리스트에 추가합니다
        answer = response_json["choices"][0]["message"]["content"]
        data["messages"].append({"role": "assistant", "content": answer})

        chat_log = ChatLog(chat_log=answer)
        chat_log.save()

        return answer
    except requests.exceptions.RequestException as e:
        print("An error occurred while sending the request:", str(e))


@csrf_exempt
def chat_with_history(request):
    message = request.GET.get("message", "")
    # 이전 대화 기록을 가져와서 messages 리스트에 추가
    chat_logs = load_chat_logs()
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": message},
        {"role": "system", "content": " "},  # 빈 시스템 메시지 추가
    ]
    for log in chat_logs:
        messages.append({"role": "user", "content": log})
        messages.append({"role": "assistant", "content": log})  # 이전 응답 기록을 추가하는 대신 이전 사용자 메시지를 추가
    # 현재 사용자 메시지를 전달하고 응답을 받음
    response_message = send_message(message)
    # 챗봇 응답을 처리하고 필요한 형식으로 변환
    processed_data = process_data(response_message)
    # 템플릿에 결과를 전달
    return render(
        request,
        "chat_with_history.html",
        {"result": processed_data, "response_message": response_message},
    )
