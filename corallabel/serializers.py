from rest_framework import serializers
from corallabel.models import Corals, CoralRect

class CoralsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Corals
    fields = ('url', 'farm', 'server', 'photoid', 'secret')

class CoralRectSerializer(serializers.ModelSerializer):
  class Meta:
    model = CoralRect
    fields = '__all__'