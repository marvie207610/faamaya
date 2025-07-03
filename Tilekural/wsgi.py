"""
WSGI config for Tilekural project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Set the default settings module for the 'wsgi' command-line environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Tilekural.settings')

# Get the WSGI application for use by servers like Gunicorn, uWSGI, or Django's runserver
application = get_wsgi_application()
