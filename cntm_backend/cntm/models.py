from django.db import models

# Create your models here.

class User(models.Model):
    token = models.CharField(max_length=50)
    username = models.CharField(max_length=30, unique=True)
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
    admin = models.IntegerField(default=0)



class Challenge(models.Model):
    name = models.CharField(max_length=100)
    descr = models.TextField()
    img_url = models.CharField(max_length=200)
    choice = models.TextField()
    open = models.IntegerField(default=0)
    creator = models.CharField(max_length=200, default="")
    answer = models.TextField(default="")
    points = models.IntegerField(default=0)
    type = models.IntegerField(default=0)
    etime = models.CharField(max_length=200, default="")
    label = models.CharField(max_length=200, default="")

class CAnswer(models.Model):
    uname = models.CharField(max_length=30)
    cid = models.IntegerField()
    text = models.CharField(max_length=200)
    img_url = models.CharField(max_length=200)
    points = models.IntegerField(default=0)

class GNTMModel(models.Model):
    name = models.CharField(max_length=100)
    descr = models.TextField()
    age = models.CharField(max_length=100)
    img_url = models.CharField(max_length=200)
    out = models.IntegerField(default=0)
    link =  models.CharField(max_length=200)


class News(models.Model):
    name = models.CharField(max_length=100)
    descr = models.TextField()
    date = models.CharField(max_length=200)

class Log(models.Model):
    username = models.CharField(max_length=30)
    cid = models.IntegerField()
    aid = models.IntegerField()
    points = models.IntegerField()
    ctype = models.IntegerField()
    ccreator = models.CharField(max_length=30)
    label = models.CharField(max_length=200)
    time = models.CharField(max_length=100)
    canswer = models.TextField()
    csolution = models.TextField()