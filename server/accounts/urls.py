from django.urls import path, include
from .views import ProfileViewSet
from rest_framework import routers


profile_list = ProfileViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update'
})

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('profile/', profile_list, name='profile-list'),
    path('registration', include('dj_rest_auth.registration.urls')),
]