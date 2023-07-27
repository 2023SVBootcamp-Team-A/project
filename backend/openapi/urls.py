from django.urls import path
from . import views


app_name = "openapi"

urlpatterns = [
    path("novels/<int:novel_id>", views.NovelView.as_view(), name="novel_input"),
    path("mynovels", views.mynovel_list, name="novel_list"),
    path("mynovels/<int:novel_id>", views.mynovels, name="novel_delete"),
    path("novels", views.novel_list),
    path("a/", views.my_api_view),
]
