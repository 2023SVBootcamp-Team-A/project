
from django.contrib import admin
from django.urls import path, include
from openapi import views as openapi_views
from users import views as user_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", include("users.urls")),
    path("", user_views.index, name="index"),  # '/' 에 해당되는 path
    path('input_form/', openapi_views.input_form, name='input_form'),
    path('chat/', openapi_views.chat, name='chat'),
]

