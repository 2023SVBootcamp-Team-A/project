from django.contrib import admin
from django.urls import path, include

# from django.contrib.auth import views as auth_views
from users import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", include("users.urls")),
    path("api/v1/", include("openapi.urls")),
    path("", views.index, name="index"),  # '/' 에 해당되는 path
]
