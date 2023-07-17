from django.urls import path
from . import views



app_name = "openapi"

urlpatterns = [
    path('mynovels', views.novel_list, name='novel_list'),
    path('mynovels/<int:novel_id>', views.mynovels, name='novel_delete'),
]
