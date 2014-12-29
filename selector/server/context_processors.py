from django.conf import settings

def template_settings(request):
    # return the value you want as a dictionnary. you may add multiple values in there.
    return {
        'KOALA_HOST': settings.KOALA_HOST,
        'DEMO': settings.DEMO
    }