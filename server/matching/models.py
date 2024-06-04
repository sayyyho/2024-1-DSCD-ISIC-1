from django.db import models

class Senior_Profile(models.Model):
    name = models.CharField(max_length=20)
    job = models.CharField(max_length=20)
    major = models.CharField(max_length=20)
    double_major = models.CharField(max_length=20, blank=True)
    sex = models.CharField(max_length=4)
    grades = models.CharField(max_length=20)
    skills = models.CharField(max_length=100)
    award_part = models.CharField(max_length=100)
    club_part = models.CharField(max_length=100)
    project_part = models.CharField(max_length=100)
    
class Embedded_Senior_Profile(models.Model):
    senior_info = models.OneToOneField(Senior_Profile, on_delete=models.CASCADE)
    major_embedding = models.JSONField(blank=True)
    double_major_embedding = models.JSONField(blank=True, null=True)
    grades_embedding = models.JSONField(blank=True)
    skills_embedding = models.JSONField(blank=True)
    award_part_embedding = models.JSONField(blank=True)
    club_part_embedding = models.JSONField(blank=True)
    project_part_embedding = models.JSONField(blank=True)