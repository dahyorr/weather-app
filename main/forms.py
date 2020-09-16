from django import forms
from .models import City


class CityForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'city-input',
        'placeholder': 'Search for a City',
        'id': 'city-input',
        'name': 'city-input'}), label='')

    class Meta:
        model = City
        fields = ['name']
