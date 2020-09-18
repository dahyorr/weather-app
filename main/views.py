from django.http import HttpResponse
from django.shortcuts import render
from .forms import CityForm
from . import models
import requests


# Create your views here.


def f_to_c(f):
    return (f - 32) * (5 / 9)


def index(request):
    new_cook = False
    data = []
    api_key = 'a2ad70a9afeb79645fdaddfdb5af862b'
    input_error_message = ''
    if request.COOKIES.get('cities'):
        cities_string = request.COOKIES.get('cities')
        cities = cities_string.split()
    else:
        cities_string = ""
        cities = []
    cities_lower = []
    for city in cities:
        cities_lower.append(str(city).lower())

    database_cities = []
    for city in models.City.objects.all():
        database_cities.append(city.name.lower())
    template_name = 'main/index.html'
    form = CityForm()

    if request.method == 'POST':
        name = request.POST.get('name')
        api_url = f'http://api.openweathermap.org/data/2.5/weather?q={name}&units=imperial&appid={api_key}'
        query = requests.get(api_url).json()
        if query['cod'] != '404':
            name_cap = str(name).capitalize()
            if str(name).lower() not in cities_lower:
                cities.append(name_cap)
                cities_string += f' {name_cap}'
                new_cook = True
            else:
                new_cook = False
                input_error_message = f'"{name}" is already added to the list'

            if str(name).lower() not in database_cities:
                form = CityForm(request.POST)
                form.save()
            else:
                db_item = models.City.objects.get(name=name_cap)
                db_item.times_searched += 1
                db_item.save()

        else:
            input_error_message = "City is not known"

    for city in cities:
        api_url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid={api_key}'
        query = requests.get(api_url).json()
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
                    'condition': query['weather'][0]['description'],
                    'icon': query['weather'][0]['icon'],
                    'city': str(city.capitalize()),
                    'country': query['sys']['country'],
                    'timezone': query['timezone']
                }
            data.append(data_split)

    context = {
        'form': form,
        'weather_data': data,
    }
    if input_error_message != '':
        context['error'] = input_error_message
    response = render(request, template_name, context)
    if new_cook:
        response.set_cookie('cities', cities_string)
    return response
# http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid={}
