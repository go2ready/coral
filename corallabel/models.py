from django.db import models

# Create your models here.
class Corals(models.Model):
  url = models.CharField(max_length=150, primary_key=True)
  farm = models.CharField(max_length=10)
  server = models.CharField(max_length=20)
  photoid = models.CharField(max_length=50)
  secret = models.CharField(max_length=50)

class CoralRect(models.Model):
  url = models.CharField(max_length=150, primary_key=True)
  x0 = 	models.FloatField()
  x1 =	models.FloatField()
  y0 =  models.FloatField()
  y1 =  models.FloatField()
