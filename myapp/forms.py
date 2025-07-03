from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'placeholder': 'Enter your email'}))
    first_name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'First name'}))
    last_name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Last name'}))
    username = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Choose a username'}))

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

class ProfileForm(forms.ModelForm):
    phone_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Phone number'}))
    nationality = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Nationality'}))
    country = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Country'}))
    date_of_birth = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    passport_photo = forms.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ['phone_number', 'nationality', 'country', 'date_of_birth', 'passport_photo']
