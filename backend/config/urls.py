from django.contrib import admin
from django.urls import path, include
from openapi import views
from users import views

from drf_yasg.views import get_schema_view
from drf_yasg import openapi as drf_yasg_openapi
from rest_framework import permissions


schema_view = get_schema_view(
    drf_yasg_openapi.Info(
        title="API문서",
        default_version="v1",
        description="login API 문서",
        license=drf_yasg_openapi.License(name="BSC License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


# from django.contrib.auth import views as auth_views



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/user/", include("users.urls")),
    path("api/v1/", include("openapi.urls")),
    path("", views.index, name="index"),  # '/' 에 해당되는 path
    path('', include('django_prometheus.urls')),

    # path("background/", views.init_setting_APIView.as_view()),
    path(
        "swagger/<str:format>/",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path(
        "swagger/swagger-config.js",
        schema_view.without_ui(cache_timeout=0),
        name="schema-swagger-ui-config",
    ),

]
