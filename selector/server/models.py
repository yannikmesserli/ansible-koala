import cookielib, urllib, urllib2
from django.conf import settings
from django.db import models

# class App(models.Model):
#     name = models.CharField(max_length=100)
#     url = models.URLField()
#     admin_url = models.URLField(blank=True)


class Device(models.Model):
    uuid = models.CharField(max_length=36)
    url = models.URLField(null=True, blank=True)
    # app = models.ForeignKey(App, blank=True, null=True)


def update_device(sender, instance, **kwargs):
    try:
        cj = cookielib.CookieJar()
        opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))

        req = urllib2.Request(settings.KOALA_HOST + '/login')
        req.add_data(urllib.urlencode({'password': settings.KOALA_PASSWORD}))

        opener.open(req).read()

        req = urllib2.Request('%s/browse/device/%s/restart' % (settings.KOALA_HOST, instance.uuid))
        req.add_data(urllib.urlencode({'test': 'data'}))
        page = opener.open(req).read()
        print "Reloaded session!"
    except:
        print "Error connecting to koala."


models.signals.post_save.connect(update_device, sender=Device, dispatch_uid="update_device")