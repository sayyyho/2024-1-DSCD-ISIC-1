from rest_framework import serializers
from accounts.models import Profile
from .models import Senior_Profile, Embedded_Senior_Profile

class SeniorRecommendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['major', 'double_major', 'grades', 'skills', 'award_part', 'club_part', 'project_part']

class SeniorProfileSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()
    
    class Meta:
        model = Senior_Profile
        fields = '__all__'
        
    def get_skills(self, obj):
        if obj.skills:
            return [skill.strip() for skill in obj.skills.split(',')]
        return []
        
class EmbeddedSeniorProfileSerializer(serializers.ModelSerializer):
    senior_info = SeniorProfileSerializer()
    class Meta:
        model = Embedded_Senior_Profile
        fields = '__all__'