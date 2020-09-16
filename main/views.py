from django.shortcuts import render
from .forms import CityForm
from . import models
import requests


# Create your views here.


def f_to_c(f):
    return (f - 32) * (5 / 9)


def index(request):
    data = []
    api_key = 'a2ad70a9afeb79645fdaddfdb5af862b'
    cities = models.City.objects.all()
    template_name = 'main/index.html'

    if request.method == 'POST':
        name = request.POST.get('name')
        api_url = f'http://api.openweathermap.org/data/2.5/weather?q={name}&units=imperial&appid={api_key}'
        query = requests.get(api_url).json()
        if query['cod'] != '404':
            form = CityForm(request.POST)
            form.save()
        else:
            error_add_message = "City is not known"
    form = CityForm()

    for city in cities:
        api_url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={api_key}'
        query = requests.get(api_url).json()
        print(query['cod'])
        if query['cod'] != '404':
            data_split = {
                    'longitude': query['coord']['lon'],
                    'latitude': query['coord']['lat'],
                    'temp_f': int(round(query['main']['temp'])),
                    'temp_feel_f': int(round(query['main']['feels_like'])),
                    'temp_c': int(round(f_to_c(query['main']['temp']))),
                    'temp_feel_c': int(round(f_to_c(query['main']['feels_like']))),
                    'humidity': query['main']['humidity'],
                    'pressure': query['main']['pressure'],
                    'wind': int(round((query['wind']['speed']) / 2.237, 2)),
                    'icon': query['weather'][0]['icon'],
                    'city': query['name'],
                    'country': query['sys']['country'],
                    'timezone': query['timezone']
                }
            data.append(data_split)


    context = {
        'form': form,
        'weather_data': data,
    }
    return render(request, template_name, context)
# http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid={}
