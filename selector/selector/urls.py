from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from rest_framework import routers
from server import views

router = routers.DefaultRouter()
#router.register(r'apps', views.AppViewSet)
router.register(r'devices', views.DeviceViewSet)

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    #url(r'^apps/$', TemplateView.as_view(template_name="apps.html")),
    url(r'^uuid/(?P<uuid>[0-9a-fA-F-]+)/$', views.DeviceRedirect.as_view()),
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    # Examples:
    # url(r'^$', 'selector.views.home', name='home'),
    # url(r'^selector/', include('selector.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
