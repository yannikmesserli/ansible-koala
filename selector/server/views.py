from django.views.generic.base import View
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response

# from server.models import App, Device
from server.models import Device
from rest_framework import viewsets
# from server.serializers import AppSerializer, DeviceSerializer
from server.serializers import DeviceSerializer


# class AppViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows apps to be viewed or edited.
#     """
#     queryset = App.objects.all()
#     serializer_class = AppSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows devices to be viewed or edited.
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class DeviceRedirect(View):

    def get(self, request, uuid):
        device, created = Device.objects.get_or_create(uuid=uuid)

        if created:
            device.save()

        if device.url:
            return HttpResponseRedirect(device.url.replace('{uuid}', uuid))
        else:
            return render_to_response('start.html')
