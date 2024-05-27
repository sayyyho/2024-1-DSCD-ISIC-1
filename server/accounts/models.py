from django.contrib.auth.models import AbstractUser
from django.db import models

# 기본 User 모델에 전화번호 추가
class User(AbstractUser):
    phone_number = models.CharField(max_length=12, blank=True, null=True)
    sex = models.CharField(max_length=2, blank=True, null=True)
