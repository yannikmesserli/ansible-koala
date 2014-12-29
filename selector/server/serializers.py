# from server.models import App, Device
from server.models import Device
from rest_framework import serializers


# class AppSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = App
#         fields = ('uri', 'name', 'url', 'admin_url')
#         url_field_name = 'uri'


class DeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Device
        # fields = ('uri', 'uuid', 'app',)
        fields = ('uri', 'uuid', 'url',)
        url_field_name = 'uri'