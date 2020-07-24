from time import timezone

from django.db import models
from django.utils.datetime_safe import datetime
from register.models import User
# Create your models here.


class MachineName(models.Model):
    machine_name = models.CharField(max_length=30,default=None,null=True,blank=True)

    def __str__(self):
        return self.machine_name


class MachineType(models.Model):
    machine_type = models.CharField(max_length=30,null=True,blank=True,default=None)

    def __str__(self):
        return self.machine_type


class MachineMake(models.Model):
    machine_make = models.CharField(max_length=30,blank=True,null=True,default=None)

    def __str__(self):
        return self.machine_make


class MachineRating(models.Model):
    machine_rating = models.CharField(max_length=30,blank=True,null=True,default=None)

    def __str__(self):
        return self.machine_rating


class MachineDetails(models.Model):
    data_and_time = models.DateTimeField(blank=True,default=datetime.now,null=True)
    user = models.ForeignKey(User,related_name = "registeredUserType",on_delete=models.CASCADE)
    machinetype = models.ForeignKey(MachineType,related_name="machineType",on_delete=models.CASCADE)
    machinename = models.ForeignKey(MachineName, related_name="machineName", on_delete=models.CASCADE)
    machinemake = models.ForeignKey(MachineMake, related_name="machineMake", on_delete=models.CASCADE)
    machinerating = models.ForeignKey(MachineRating, related_name="machineRating", on_delete=models.CASCADE)
