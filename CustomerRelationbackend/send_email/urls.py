from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'send_email', EmailView.as_view(), name='send_email')
]
