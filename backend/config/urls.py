from django.contrib import admin
from django.urls import path, include
from openapi import views
from drf_yasg.views import get_schema_view
from users import views
from drf_yasg import openapi
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

# from django.contrib.auth import views as auth_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", include("users.urls")),
    path("", views.index, name="index"),  # '/' 에 해당되는 path
    path("input_form/", views.input_form, name="input_form"),
    path("chat/", views.chat, name="chat"),
    path("api/v1/", include("openapi.urls")),
    path("background/", views.init_setting_APIView.as_view()),
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
