from rest_framework import serializers
from accounts.models import Profile

class JobRecommendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['major', 'double_major', 'skills', 'award_detail', 'club_detail', 'project_detail']
        