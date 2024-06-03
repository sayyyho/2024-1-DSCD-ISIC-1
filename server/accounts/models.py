from django.contrib.auth.models import AbstractUser
from django.db import models

# 기본 User 모델에 전화번호 추가
class User(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True) # 전화번호 (필수 x)
    sex = models.CharField(max_length=2, blank=True, null=True) # 성별 (필수 x)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    major = models.CharField(max_length=20) # 주전공 (필수 o)
    double_major = models.CharField(max_length=20, blank=True) # 복수전공 (필수 x)
    grades = models.CharField(max_length=20) # 학점 (필수 o)
    skills = models.CharField(max_length=100) # 보유 기술 (필수 o)
    award_part = models.CharField(max_length=20) # 수상 분야 (필수 o)
    award_detail = models.TextField(blank=True) # 수상 세부 내역 (필수 x)
    club_part = models.CharField(max_length=20) # 동아리 분야 (필수 o)
    club_detail = models.TextField(blank=True) # 동아리 세부 내역 (필수 x)
    project_part = models.CharField(max_length=20) # 프로젝트 분야 (필수 o)
    project_detail = models.TextField(blank=True) # 프로젝트 세부 내역 (필수 x)
    
    def __str__(self):
        return self.user.username