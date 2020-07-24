from django.contrib import admin
from customer_details.models import ContactPerson,Company,CustomerDetails
# Register your models here.

admin.site.register(ContactPerson)
admin.site.register(Company)
admin.site.register(CustomerDetails)