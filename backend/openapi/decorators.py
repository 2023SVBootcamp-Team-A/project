from functools import wraps
from django.http import JsonResponse
from requests import Response

# def login_required_api(view_func):  #토큰전용

#     @wraps(view_func)
#     def wrapped_view(request, *args, **kwargs):
#         if request.user.is_authenticated:
#             return view_func(request, *args, **kwargs)
#         else:
#             return JsonResponse({'message': '로그인이 필요합니다.'}, status=401)

#     return wrapped_view


def login_required_api(view_func):  # 평문전용
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        id_param = request.META.get("HTTP_ID")
        if id_param is None:
            return JsonResponse(
                {"error": "로그인하세요."},
                status=403,
                json_dumps_params={"ensure_ascii": False},
            )
        else:
            return view_func(request, *args, **kwargs)

    return wrapped_view
