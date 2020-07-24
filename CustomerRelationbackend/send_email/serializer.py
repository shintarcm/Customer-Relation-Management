from abc import ABC

from rest_framework import serializers
from django.core.mail import send_mail


class SendEmailSerializer(serializers.Serializer):

    user_email=serializers.EmailField(),
    customer_email=serializers.EmailField(),

    # def create(self, validated_data):
    #     instance = super(ServiceDetailsSerializer, self).create(validated_data)
    #     send_mail(
    #         'Instance {} has been created'.format(instance.pk),
    #         'here is the message.DATA: {}'.format(validated_data),
    #         'shintarcm@gmail.com',
    #         ['chidambaram0063@gmail.com'],
    #         fail_silently=False
    #     )
    #     return instance

