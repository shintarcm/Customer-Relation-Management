from rest_framework import serializers
from .models import Company,ContactPerson


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        exclude = ''


class ContactPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPerson
        exclude = ''


class CompanyContactPersonSerializer(serializers.Serializer):
    company = CompanySerializer(many=True)
    contact_person = ContactPersonSerializer(many=True)