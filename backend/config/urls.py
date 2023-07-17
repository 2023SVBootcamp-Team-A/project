from django.contrib import admin
from django.urls import path, include

# from django.contrib.auth import views as auth_views
from users import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", include("users.urls")),
    path("openapi/", include("openapi.urls")),
    path("", user_views.index, name="index"),  # '/' 에 해당되는 path
    path('input_form/', openapi_views.input_form, name='input_form'),
    path('chat/', openapi_views.chat, name='chat'),
]
