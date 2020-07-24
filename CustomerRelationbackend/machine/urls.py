from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'get_machine_detail', GetMachineDetail.as_view(), name='get_machine_detail'),
    # url(r'get_machine_name', GetMachineName.as_view(), name='get_machine_name'),
    # url(r'get_machine_make', GetMachineMake.as_view(), name='get_machine_make'),
    # url(r'get_machine_rating', GetMachineRating.as_view(), name='get_machine_rating'),
    url(r'add_machine_type',AddMachineType.as_view(),name='add_machine_type'),
    url(r'add_machine_name',AddMachineName.as_view(),name='add_machine_name'),
    url(r'add_machine_make',AddMachineMake.as_view(),name='add_machine_make'),
    url(r'add_machine_rating',AddMachineRating.as_view(),name='add_machine_rating'),
    url(r'save_machine_details',SaveMachineDetails.as_view(),name='save_machine_details'),

]
