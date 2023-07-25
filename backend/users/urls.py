from django.urls import path
from users.views import (
    index,
    RegistrationAPIView,
    LoginAPIView,
    LogoutView,
    MyTokenView,
)


urlpatterns = [
    path("", index),
    path(
        "login/",
        LoginAPIView.as_view(),
    ),
    path("sign/", RegistrationAPIView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("token/", MyTokenView.as_view()),
]
