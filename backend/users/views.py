import datetime
from getpass import getuser
from site import getuserbase
from tokenize import TokenError
from xml.dom import ValidationErr
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from config.settings import SECRET_KEY
from users.models import MyUser
from users.forms import UserCreationForm
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from users.serializers import (
    LoginSerializer,
    RegistrationSerializer,
    UserSeriallizer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import jwt
from django.contrib.auth import get_user_model


from .models import MyUser


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
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationErr as e:
            return Response({"message": "등록된 회원이 아닙니다."})
        user_email = request.data.get("email")
        if user_email is None:
            return Response({"message": ""})
        user = MyUser.objects.filter(email=user_email).first()

        # 토큰 생성
        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)
        response = Response(
            {
                "message": "login success",
                "jwt_token": {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                },
            },
            status=status.HTTP_200_OK,
        )
        response.set_cookie("access_token", access_token, httponly=True)
        response.set_cookie("refresh_token", refresh_token, httponly=True)
        return response


class MyTokenView(APIView):
    def post(self, request):
        try:
            access_token = request.COOKIES["access_token"]
            payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
            pk = payload.get("user_id")
            User = get_user_model()
            user = User.objects.get(id=pk)
            serializer = UserSeriallizer(user)
            response = Response(
                {
                    "jwt_token": {
                        "access_token": access_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            response.set_cookie("access_token", access_token)
            return response

        # 토큰 만료시 토큰 갱신
        except jwt.exceptions.ExpiredSignatureError:
            try:
                # access 토큰 만료시
                serializer = TokenRefreshSerializer(
                    data={"refresh": request.COOKIES.get("refresh_token", None)}
                )

                if serializer.is_valid(raise_exception=True):
                    access_token = serializer.validated_data["access"]
                    refresh_token = request.COOKIES.get("refresh_token", None)
                    payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
                    pk = payload.get("user_id")
                    User = get_user_model()
                    user = User.objects.get(id=pk)
                    serializer = UserSeriallizer(instance=user)
                    response = Response(
                        {
                            "jwt_token": {
                                "access_token": access_token,
                                "refresh_token": refresh_token,
                            },
                        },
                        status=status.HTTP_200_OK,
                    )
                    response.set_cookie("access_token", access_token)
                    response.set_cookie("refersh_token", refresh_token)
                    return response
            except rest_framework_simplejwt.exceptions.TokenError:  # refresh 토큰까지 만료 시
                return Response({"message": "로그인이 만료되었습니다."}, status=status.HTTP_200_OK)

            raise jwt.exceptions.InvalidTokenError

        except jwt.exceptions.InvalidTokenError:  # 토큰 invalid 인 모든 경우
            return Response({"message": "로그인이 만료되었습니다."}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logout success"})
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
