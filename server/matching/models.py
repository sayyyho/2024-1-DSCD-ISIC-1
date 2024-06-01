from django.db import models

class Senior_Profile(models.Model):
    job = models.CharField(max_length=20)
    major = models.CharField(max_length=20)
    double_major = models.CharField(max_length=20, blank=True)
    sex = models.CharField(max_length=4)
    grades = models.CharField(max_length=20)
    skills = models.CharField(max_length=100)
    award_part = models.CharField(max_length=100)
    club_part = models.CharField(max_length=100)
    project_part = models.CharField(max_length=100)