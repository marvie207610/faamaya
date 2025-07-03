from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

# ===============================
# CATEGORY
# ===============================

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    color = models.CharField(max_length=7, default='#3498db')  # Hex color for UI badges
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category_detail', kwargs={'slug': self.slug})


# ===============================
# PROJECT
# ===============================

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='projects')
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    volunteers_count = models.PositiveIntegerField(default=0)
    classifications_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('project_detail', kwargs={'slug': self.slug})


# ===============================
# PROFILE for registration details
# ===============================

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    nationality = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    passport_photo = models.ImageField(upload_to='passports/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"


# ===============================
# USER PROFILE (e.g. dashboard extras)
# ===============================

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile_data')
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    total_classifications = models.PositiveIntegerField(default=0)
    joined_projects = models.ManyToManyField(Project, blank=True, related_name='members')

    def __str__(self):
        return f"{self.user.username}'s Profile Data"


# ===============================
# BLOG POST
# ===============================

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    thumbnail = models.ImageField(upload_to='blog_thumbnails/', blank=True, null=True)
    excerpt = models.TextField()
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog_detail', kwargs={'slug': self.slug})
