from rest_framework import serializers
from machine.models import MachineType,MachineMake,MachineName,MachineRating


class MachineTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineType
        exclude = ''


class MachineNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineName
        exclude = ''


class MachineMakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineMake
        exclude = ''


class MachineRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineRating
        exclude = ''



