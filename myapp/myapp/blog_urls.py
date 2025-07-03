# myapp/blog_urls.py

from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.blog, name='post_list'),
]
