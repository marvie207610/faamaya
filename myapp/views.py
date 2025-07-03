from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .forms import CustomUserCreationForm, ProfileForm

# -----------------------
# Authentication Views
# -----------------------

def register(request):
    if request.method == 'POST':
        user_form = CustomUserCreationForm(request.POST)
        profile_form = ProfileForm(request.POST, request.FILES)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            messages.success(request, 'Account created successfully! Please log in.')
            return redirect('login')
    else:
        user_form = CustomUserCreationForm()
        profile_form = ProfileForm()
    return render(request, 'auth/register.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })

@login_required
def profile(request):
    return render(request, 'auth/profile.html')

@login_required
def dashboard(request):
    return render(request, 'auth/dashboard.html')

# -----------------------
# Home & Main Navigation
# -----------------------

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def projects(request):
    return render(request, 'projects.html')

def get_involved(request):
    return render(request, 'get_involved.html')

def talk(request):
    return render(request, 'talk.html')

def build(request):
    return render(request, 'build.html')

# -----------------------
# Sub-pages under About
# -----------------------

def our_team(request):
    return render(request, 'about/our_team.html')

def innovation(request):
    return render(request, 'about/innovation.html')

def why_join(request):
    return render(request, 'about/why_join.html')

def difference(request):
    return render(request, 'about/difference.html')

# -----------------------
# Footer & Static Pages
# -----------------------

def publications(request):
    return render(request, 'publications.html')

def acknowledgements(request):
    return render(request, 'acknowledgements.html')

def volunteer(request):
    return render(request, 'volunteer.html')

def education(request):
    return render(request, 'education.html')

def mobile(request):
    return render(request, 'mobile.html')

def daily(request):
    return render(request, 'daily.html')

def lab(request):
    return render(request, 'lab.html')

def dev(request):
    return render(request, 'dev.html')

def data(request):
    return render(request, 'data.html')

def panoptes(request):
    return render(request, 'panoptes.html')

# -----------------------
# Blog and Project Pages
# -----------------------

def blog(request):
    return render(request, 'blog.html')

def projects_list(request):
    return render(request, 'projects_list.html')
