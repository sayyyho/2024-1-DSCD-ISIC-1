from rest_framework import serializers
from accounts.models import Profile

class JobRecommendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['major', 'double_major', 'grades', 'skills', 'award_detail', 'club_detail', 'project_detail']
        
class SeniorRecommendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['major', 'double_major', 'grades', 'skills', 'award_part', 'club_part', 'project_part']
        