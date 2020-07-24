from django.db import models

from customer_details.models import ContactPerson
from register.models import User

# Create your models here.


class ServiceDetails(models.Model):
    user = models.ForeignKey(User,related_name="serviceUser",on_delete=models.CASCADE)
    customer = models.ForeignKey(ContactPerson,related_name="customer",on_delete=models.CASCADE)
    machine_serial_no = models.CharField(max_length=30,blank=True,default=None,null=True)
    date_of_complaint = models.DateField(max_length=100,blank=True,default=None,null=True)
    date_of_completion = models.DateField(max_length=100,blank=True,default=None,null=True)
    problem = models.CharField(max_length=200,blank=True,default=None,null=True)
    rectification = models.CharField(max_length=200,blank=True,default=None,null=True)
    cost = models.CharField(max_length=30,blank=True,default=None,null=True)
    payment_status = models.CharField(max_length=20,blank=True,default=None,null=True)