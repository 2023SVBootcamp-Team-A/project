from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from users.forms import UserCreationForm

from users.serializers import LoginSerializer, RegistrationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


def index(request):
    return HttpResponse("안녕하세요 pybo에 오신것을 환영합니다.")


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    @swagger_auto_schema(
        operation_description="User Sign API",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["email", "password", "nickname"],
            properties={
                "email": openapi.Schema(
                    type=openapi.TYPE_STRING, description="ex) abc@naver.com"
                ),
                "password": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    format=openapi.FORMAT_PASSWORD,
                    description="ex) 1q2w3e4r!",
                ),
                "nickname": openapi.Schema(
                    type=openapi.TYPE_STRING, description="ex) bootcamp"
                ),
            },
        ),
        responses={
            201: "회원가입 성공",
            403: "서버에러",
        },
    )
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    @swagger_auto_schema(
        operation_description="User Login API",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["email", "password"],
            properties={
                "email": openapi.Schema(
                    type=openapi.TYPE_STRING, description="ex) abc@naver.com"
                ),
                "password": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    format=openapi.FORMAT_PASSWORD,
                    description="ex) 1q2w3e4r!",
                ),
            },
        ),
        responses={200: "로그인 성공", 400: "로그인 실패"},
    )
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
