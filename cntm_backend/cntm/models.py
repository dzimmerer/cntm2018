from django.db import models

# Create your models here.

class User(models.Model):
    token = models.CharField(max_length=50)
    username = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    passwd = models.CharField(max_length=100)
    score = models.IntegerField()
    real_name = models.CharField(max_length=100)
    img_url = models.CharField(max_length=200)
    age = models.IntegerField()
    hair = models.CharField(max_length=30)
    eye = models.CharField(max_length=30)
    descr = models.TextField()
    hobbies = models.TextField()



class Challenge(models.Model):
    name = models.CharField(max_length=100)
    descr = models.TextField()
    img_url = models.CharField(max_length=200)
    choice = models.TextField()
    open = models.IntegerField(default=0)

class CAnswer(models.Model):
    uname = models.CharField(max_length=30)
    cid = models.IntegerField()
    text = models.CharField(max_length=200)
    img_url = models.CharField(max_length=200)
