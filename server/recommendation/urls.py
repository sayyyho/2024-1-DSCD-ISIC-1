from django.urls import path
from .views import JobRecommendView

urlpatterns = [
    path('job/', JobRecommendView.as_view(), name='recomendation'),
]
