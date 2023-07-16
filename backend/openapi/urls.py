from django.urls import path
from . import views



app_name = "openapi"

urlpatterns = [
    path('mynovels/', views.novel_list, name='novel_list'),
    path('mynovels/delete/<int:novel_id>/', views.novel_delete, name='novel_delete'),
    path('mynovels/detail/<int:novel_id>/', views.novel_detail, name='novel_detail'), 
]
