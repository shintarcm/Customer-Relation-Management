from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'addCompany', AddCompany.as_view(), name='addCompany'),
    url(r'getCompany', GetCompany.as_view(), name='getCompany'),
    url(r'selectCompany', SelectCompany.as_view(), name='selectCompany'),
    url(r'selectContactPersonName', SelectContactPersonName.as_view(), name='selectContactPersonName'),
    url(r'addContactPersonDetails', AddContactPersonDetails.as_view(), name='addContactPersonDetails'),
    url(r'saveContactPersonDetails', SaveContactPersonDetails.as_view(), name='saveContactPersonDetails')
]
