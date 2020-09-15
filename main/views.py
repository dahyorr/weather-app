from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.


class Index(TemplateView):
    template_name = 'main/index.html'
    extra_context = {}
# http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid={}
