# matching/urls.py

from django.urls import path
from .views import SeniorRecommendView, SeniorProfileDetailView

urlpatterns = [
    path('senior/', SeniorRecommendView.as_view(), name='similarity'),
    path('senior-detail/<int:senior_id>/', SeniorProfileDetailView.as_view(), name='similarity'),
]
