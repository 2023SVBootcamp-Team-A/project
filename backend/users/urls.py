from django.urls import path
from users.views import index, RegistrationAPIView, LoginAPIView


urlpatterns = [
    path("", index),
    path(
        "login/",
        LoginAPIView.as_view(),
    ),
    path("sign/", RegistrationAPIView.as_view()),
]
