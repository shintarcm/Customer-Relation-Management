from django.contrib import admin

from .models import MachineName,MachineMake,MachineRating,MachineType,MachineDetails

# Register your models here.
admin.site.register(MachineType)
admin.site.register(MachineRating)
admin.site.register(MachineMake)
admin.site.register(MachineName)
admin.site.register(MachineDetails)
