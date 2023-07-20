from django.urls import path
from . import views


app_name = "openapi"

urlpatterns = [
    path("novels/<int:novel_id>", views.input_form, name="novel_input"),
    path("mynovels", views.novel_list, name="novel_list"),
    path("mynovels/<int:novel_id>", views.mynovels, name="novel_delete"),
    path("get_parsed_result/<int:novel_id>", views.get_parsed_result),
    path("input_form/<int:novel_id>", views.input_form)
]
