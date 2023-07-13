from django.urls import path
from users.views import index, RegistrationAPIView, LoginAPIView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="API문서",
        default_version="v1",
        description="login API 문서",
        license=openapi.License(name="BSC License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("", index),
    path(
        "login/",
        LoginAPIView.as_view(),
    ),
    path("sign/", RegistrationAPIView.as_view()),
    path(
        "swagger/<str:format>/",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="scehma-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path(
        "swagger/swagger-config.js",
        schema_view.without_ui(cache_timeout=0),
        name="schema-swagger-ui-config",
    ),
]
