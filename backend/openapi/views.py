from django.shortcuts import render
from .models import Novel
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
import json



@csrf_exempt
def novel_list(request):
    if request.method =="GET":
        id_param = request.META.get('HTTP_ID')
        data = serializers.serialize('json', Novel.objects.filter(user_id=id_param).order_by('-create_at'))
        return JsonResponse(data, safe=False)
    

@csrf_exempt
def novel_detail(request, novel_id):
    if request.method == "GET":
        novel = get_object_or_404(Novel, pk=novel_id)

        # 각 모델에 대한 필드 리스트
        character_fields = ['name', 'personality']
        novel_story_fields = ['page', 'content', 'image']
        background_fields = ['genre', 'time_period', 'time_projection', 'summary']

        # 해당 속성값을 딕셔너리로 가져오기
        character_data = list(novel.novel_character.values(*character_fields))
        novel_story_data = list(novel.novel_story.values(*novel_story_fields))
        background_data = list(novel.novel_background.values(*background_fields))

        # 필드 리스트를 포함하여 직렬화된 데이터 생성
        serialized_data = {
            'novel': serializers.serialize('python', [novel]),
            'characters': character_data,
            'novel_stories': novel_story_data,
            'backgrounds': background_data,
        }
        
        # JSON으로 변환
        json_data = json.dumps(serialized_data, cls=DjangoJSONEncoder, ensure_ascii=False)
        return JsonResponse(json_data, safe=False, content_type='application/json')

    

@csrf_exempt
def novel_delete(request, novel_id):
    if request.method == "DELETE":
        try:
            novel = Novel.objects.get(pk=novel_id)
            if request.META.get('HTTP_ID') != str(novel.user.id):
                return JsonResponse({"error": "삭제권한이 없습니다."}, status=403)
            novel.delete()
            return JsonResponse({"success": "소설이 성공적으로 삭제되었습니다."}, status=200)
        except Novel.DoesNotExist:
            return JsonResponse({"error": "해당 ID를 가진 소설이 존재하지 않습니다."}, status=404)
    else:
        return JsonResponse({"error": "이 메소드는 허용되지 않습니다."}, status=405)



