from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'save_service_details', SaveServiceDetails.as_view(), name='save_service_details'),
    url(r'get_service_details', GetServiceDetails.as_view(), name='get_service_details'),
]
