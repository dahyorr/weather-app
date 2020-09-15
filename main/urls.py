from django.urls import path
from . import views

app_name = 'Main'
urlpatterns = [
    path('', views.Index.as_view(), name='Home'),
]