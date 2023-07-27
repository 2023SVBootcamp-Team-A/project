from django.urls import path
from users.views import index, RegistrationAPIView, LoginAPIView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

urlpatterns = [
    path("", index),
    path(
        "login/",
        LoginAPIView.as_view(),
    ),
    path("sign/", RegistrationAPIView.as_view()),
]
