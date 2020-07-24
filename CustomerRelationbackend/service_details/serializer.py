from rest_framework import serializers

from .models import ServiceDetails


class ServiceDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceDetails
        fields = '__all__'
