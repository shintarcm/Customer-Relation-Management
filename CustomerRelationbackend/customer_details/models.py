from django.db import models
from register.models import User
# Create your models here.


class Company(models.Model):
    company = models.CharField(max_length=50,default=None,null=True,blank=True)
    companyAddress = models.CharField(max_length=100, default=None, null=True, blank=True)

    def __str__(self):
        return self.company


class ContactPerson(models.Model):
    company = models.ForeignKey(Company,related_name='companyName',on_delete=models.CASCADE)
    contactPersonName = models.CharField(max_length=50,default=None,null=True,blank=True)
    contactPersonMobileNumber = models.CharField(max_length=10,default=None,null=True,blank=True)
    contactPersonEmailId = models.EmailField(max_length=20,default=None,null=True,blank=True)

    def __str__(self):
        return self.contactPersonName


class CustomerDetails(models.Model):
    user = models.ForeignKey(User,related_name = 'user',on_delete=models.CASCADE)
    customer_details = models.ForeignKey(ContactPerson,related_name='customerDetails',on_delete=models.CASCADE)
