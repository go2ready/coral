from rest_framework import serializers
from corallabel.models import Corals, CoralRect

class CoralsSerializer(serializers.ModelSerializer):
  class Meta:
      model = Corals
      fields = ('url', 'farm', 'server', 'photoid', 'secret')

class CoralRectSerializerFull(serializers.ModelSerializer):
  class Meta:
      model = CoralRect
      fields = ('url', 'x0', 'x1', 'y0', 'y1')