from django.db import models
from django.contrib.auth.models import AbstractUser


# from machine.models import MachineRating,MachineMake,MachineName,MachineType

# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(blank=True)
    password = models.CharField(max_length=6)
    confirm_password = models.CharField(max_length=6)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username

