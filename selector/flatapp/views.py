from django.views.generic.base import View
from django.shortcuts import render_to_response
import relayr
from relayr import Client
import time

class FlatApp(View):

    def get(self, request):
        
        # print relayr.version.__version__

        # c = Client(token='LuvVzENyptMyC.wuxuYmiQbJwWu-okJa ')
        # d = c.get_device(id='b206d118-6f2d-4fa5-860d-00714b51d837').get_info()
        # messages = []
        # def callback(message, channel):
        #     messages.append(message)
        # user = c.get_user()
        # print user.connect_device
        # conn = user.connect_device(d, callback)
        # messages = []
        # conn.start()

        # while(len(messages) < 1):
        #     time.sleep(0.05)
        # conn.stop()

        # print messages[0]

        return render_to_response('flatapp.html', {})