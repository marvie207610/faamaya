from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # Home
    path('', views.home, name='home'),

    # Main navigation pages
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('get-involved/', views.get_involved, name='get_involved'),
    path('talk/', views.talk, name='talk'),
    path('build/', views.build, name='build'),

    # Sub-pages under About
    path('about/our_team/', views.our_team, name='our_team'),
    path('about/innovation/', views.innovation, name='innovation'),
    path('about/why-join/', views.why_join, name='why_join'),
    path('about/difference/', views.difference, name='difference'),

    # Authentication (custom views + fallback login/logout)
    path('register/', views.register, name='register'),
    path('profile/', views.profile, name='profile'),
    path('dashboard/', views.dashboard, name='dashboard'),

    # Login/Logout using Django's built-in views
    path('login/', auth_views.LoginView.as_view(template_name='auth/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # Footer & static pages
    path('publications/', views.publications, name='publications'),
    path('acknowledgements/', views.acknowledgements, name='acknowledgements'),
    path('volunteer/', views.volunteer, name='volunteer'),
    path('education/', views.education, name='education'),
    path('mobile/', views.mobile, name='mobile'),
    path('daily/', views.daily, name='daily'),
    path('lab/', views.lab, name='lab'),
    path('dev/', views.dev, name='dev'),
    path('data/', views.data, name='data'),
    path('panoptes/', views.panoptes, name='panoptes'),

    # Blog and Projects
    path('blog/', views.blog, name='blog'),
    path('projects-list/', views.projects_list, name='projects_list'),
]
