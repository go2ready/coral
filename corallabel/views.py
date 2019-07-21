from django.shortcuts import render

from django.views.generic import View
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

import xml.etree.ElementTree as ET

from corallabel.models import Corals, CoralRect
from corallabel.serializers import CoralsSerializer, CoralRectSerializer

from rest_framework.views import APIView

# importing the requests library 
import requests 
import json
import urllib

FLICKR_URL = 'https://www.flickr.com/services/rest/'

def GetFlickrUrl(farmId, serverId, id, secret):
  return f'https://farm{farmId}.staticflickr.com/{serverId}/{id}_{secret}_b.jpg'

class LabelledView(APIView):
  def get(self, request):
    queryset = CoralRect.objects.all()
    serializer = CoralRectSerializer(queryset, many=True)
    return JsonResponse(serializer.data, safe=False)

# Create your views here.
class PhotoRequestView(APIView):
  def get(self, request):
    data = Corals.objects.exclude(url__in=CoralRect.objects.values_list('url', flat=True)).order_by('?')
    if len(data) > 0:
      serializer = CoralsSerializer(data[0])
      sdata = serializer.data
      sdata['count'] = CoralRect.objects.count()
      return JsonResponse(sdata)

    return HttpResponse(status=204,)

  def post(self, request):
    data = request.data
    print(data)

    url = data.get('url', '')
    x0 = float(data.get('x0', ''))
    x1 = float(data.get('x1', ''))
    y0 = float(data.get('y0', ''))
    y1 = float(data.get('y1', ''))
    try:
      coralrectInstance = CoralRect.objects.create(url=url,x0=x0,x1=x1,y0=y0,y1=y1)
      coralrectInstance.save()
    except:
      print('duplicated entry discarded')

    # Created
    return HttpResponse(status=201)

# Front end app view that loads the app
class FrontendAppView(View):
  """
  Serves the compiled frontend entry point (only works if you have run `yarn
  run build`).
  """
  def get(self, request):
    # Corals.objects.all().delete()
    if Corals.objects.count() < 1500:
      # fetch 2000 entries from flickr
      print('Populating flickr db')
      for x in range(20):
        print(f'{x+1} of 20')
        queryParams = {
          'method': "flickr.photos.search",
          'api_key': settings.FLICKR_KEY,
          'text': "coral",
          'sort': "relevance",
          'per_page': 100,
          'page': x + 1,
        }
        # print(queryParams)
        # sending get request and saving the response as response object 
        r = requests.get(url = FLICKR_URL, params = queryParams)
        # print(r.text)
        root = ET.fromstring(r.text)
        photosNode = root.find('photos')
        photos = photosNode.findall('photo')

        for photo in photos:
          try:
            farm = photo.get('farm')
            id = photo.get('id')
            secret = photo.get('secret')
            server = photo.get('server')
            url = GetFlickrUrl(farm, server, id, secret)

            coralInstance = Corals.objects.create(url=url, farm=farm, server=server, photoid=id, secret=secret)
            coralInstance.save()
          except:
            print('failed to add to db')
    print('Enough photo in flickr db')

    try:
        return render(request, 'corallabel/build/index.html', {})
    except FileNotFoundError:
        return HttpResponse(
            """
            This URL is only used when you have built the production
            version of the app. Visit http://localhost:3000/ instead, or
            run `yarn run build` to test the production version.
            """,
            status=501,
        )