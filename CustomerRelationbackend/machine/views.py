from datetime import datetime, timezone
from venv import logger

from .serializer import MachineTypeSerializer, MachineMakeSerializer, MachineNameSerializer, MachineRatingSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
import logging
from register.models import User
from .models import MachineType, MachineRating, MachineMake, MachineName, MachineDetails


# Create your views here.


class GetMachineDetail(APIView):
    serializer_type = MachineTypeSerializer
    serializer_name = MachineNameSerializer
    serializer_make = MachineMakeSerializer
    serializer_rating = MachineRatingSerializer

    def get(self, request):
        type_list = MachineType.objects.all()
        name_list = MachineName.objects.all()
        make_list = MachineMake.objects.all()
        rating_list = MachineRating.objects.all()
        type_data = self.serializer_type(type_list, many=True)
        make_data = self.serializer_make(make_list,many=True)
        name_data = self.serializer_name(name_list,many=True)
        rating_data = self.serializer_rating(rating_list,many=True)
        return Response({
            'machine_type':type_data.data,
            'machine_name':name_data.data,
            'machine_make':make_data.data,
            'machine_rating':rating_data.data
        })


# class GetMachineName(APIView):
#     serializer = MachineNameSerializer
#
#     def get(self, request):
#         name_list = MachineName.objects.all()
#         data = self.serializer(name_list, many=True)
#         return Response(data.data)
#
#
# class GetMachineMake(APIView):
#     serializer = MachineMakeSerializer
#
#     def get(self, request):
#         make_list = MachineMake.objects.all()
#         data = self.serializer(make_list, many=True)
#         return Response(data.data)
#
#
# class GetMachineRating(APIView):
#     serializer = MachineRatingSerializer
#
#     def get(self, request):
#         rating_list = MachineRating.objects.all()
#         data = self.serializer(rating_list, many=True)
#         return Response(data.data)


class AddMachineType(APIView):
    serializer = MachineTypeSerializer

    def post(self, request):
        data = request.data
        machine_type = data['data']
        if not machine_type:
            return Response({'status':'error','errors':'machine type cannot be empty'})
        try:
            MachineType.objects.get(machine_type=machine_type)
            return Response({'status': 'error', 'errors': 'machine type already exists'})
        except:
            pass
        MachineType.objects.create(machine_type=machine_type)
        return Response({'status': 'success', 'message': 'machine type added successfully'})


class AddMachineName(APIView):
    serializer = MachineNameSerializer

    def post(self, request):
        data = request.data
        machine_name = data['data']
        if not machine_name:
            return Response({'status':'error','errors':'machine name cannot be empty'})
        try:
            MachineName.objects.get(machine_name=machine_name)
            return Response({'status': 'error', 'errors': 'machine name already exists'})
        except:
            pass
        MachineName.objects.create(machine_name=machine_name)
        return Response({'status': 'success', 'message': 'machine name added successfully'})


class AddMachineMake(APIView):
    serializer = MachineMakeSerializer

    def post(self, request):
        data = request.data
        machine_make = data['data']
        if not machine_make:
            return Response({'status':'error','errors':'machine make cannot be empty'})
        try:
            MachineMake.objects.get(machine_make=machine_make)
            return Response({'status': 'error', 'errors': 'machine make already exists'})
        except:
            pass
        MachineMake.objects.create(machine_make=machine_make)
        return Response({'status': 'success', 'message': 'machine make added successfully'})


class AddMachineRating(APIView):
    serializer = MachineRatingSerializer

    def post(self, request):
        data = request.data
        machine_rating = data['data']
        if not machine_rating:
            return Response({'status':'error','errors':'machine rating cannot be empty'})
        try:
            MachineRating.objects.get(machine_rating=machine_rating)
            return Response({'status': 'error', 'errors': 'machine rating already exists'})
        except:
            pass
        MachineRating.objects.create(machine_rating=machine_rating)
        return Response({'status': 'success', 'message': 'machine rating added successfully'})


class SaveMachineDetails(APIView):

    def post(self, request):
        data = request.data
        user_id = data['user_id']
        machine_type = data['machine_type']
        machine_name = data['machine_name']
        machine_make = data['machine_make']
        machine_rating = data['machine_rating']
        try:
            User.objects.all().filter(id=user_id)
        except:
            return Response({'status': 'error', 'message': 'user does not exists'})
        try:
            logger.error('hello1')
            mtype = MachineType.objects.all().get(machine_type=machine_type)
            logger.error('hello2')
            machine_type_id = mtype.id
            logger.error(machine_type_id)
        except:
            return Response({'status': 'error', 'message': 'machine type does not exists!!'})
        try:
            mname = MachineName.objects.all().get(machine_name=machine_name)
            machine_name_id = mname.id
        except:
            return Response({'status': 'error', 'message': 'machine name does not exists!!'})
        try:
            mmake = MachineMake.objects.all().get(machine_make=machine_make)
            machine_make_id = mmake.id
        except:
            return Response({'status': 'error', 'message': 'machine make does not exists!!'})
        try:
            mrating = MachineRating.objects.all().get(machine_rating=machine_rating)
            machine_rating_id = mrating.id
        except:
            return Response({'status': 'error', 'message': 'machine rating does not exists!!'})
        MachineDetails.objects.create(user_id=user_id, machinetype_id=machine_type_id,
                                      machinemake_id=machine_make_id,machinename_id=machine_name_id,machinerating_id=machine_rating_id)
        logger.error('hello5')
        return Response({'status': 'success', 'message': 'machine details added'})


# class SelectMachineName(APIView):
#     serializer = MachineNameSerializer
#
#     def post(self, request):
#         data = request.data
#         user_id = data['user_id']
#         machine_name = data['machine_name']
#         try:
#             User.objects.all().filter(id=user_id)
#         except:
#             return Response({'status': 'error', 'message': 'user does not exists'})
#         try:
#             mname = MachineName.objects.all().get(machine_name=machine_name)
#             machine_name_id = mname.id
#         except:
#             return Response({'status': 'error', 'message': 'machine name does not exists!!'})
#         try:
#             UserMachineName.objects.filter(user_id=user_id).get(machinename_id=machine_name_id)
#             return Response({'status': 'error', 'message': 'user and machine name already added'})
#         except:
#             pass
#         UserMachineName.objects.create(user_id=user_id, machinename_id=machine_name_id)
#         return Response({'status': 'success', 'message': 'machine name added to user model'})
#
#
# class SelectMachineMake(APIView):
#     serializer = MachineMakeSerializer
#
#     def post(self, request):
#         data = request.data
#         user_id = data['user_id']
#         machine_make = data['machine_make']
#         try:
#             User.objects.all().filter(id=user_id)
#         except:
#             return Response({'status': 'error', 'message': 'user does not exists'})
#         try:
#             mmake = MachineMake.objects.all().get(machine_make=machine_make)
#             machine_make_id = mmake.id
#         except:
#             return Response({'status': 'error', 'message': 'machine make does not exists!!'})
#         try:
#             UserMachineMake.objects.filter(user_id=user_id).get(machinemake_id=machine_make_id)
#             return Response({'status': 'error', 'message': 'user and machine make already added'})
#         except:
#             pass
#         UserMachineMake.objects.create(user_id=user_id, machinemake_id=machine_make_id)
#         return Response({'status': 'success', 'message': 'machine make added to user model'})
#
#
# class SelectMachineRating(APIView):
#     serializer = MachineRatingSerializer
#
#     def post(self, request):
#         data = request.data
#         user_id = data['user_id']
#         machine_rating = data['machine_rating']
#         try:
#             User.objects.all().filter(id=user_id)
#         except:
#             return Response({'status': 'error', 'message': 'user does not exists'})
#         try:
#             mrating = MachineRating.objects.all().get(machine_rating=machine_rating)
#             machine_rating_id = mrating.id
#         except:
#             return Response({'status': 'error', 'message': 'machine rating does not exists!!'})
#         try:
#             UserMachineRating.objects.filter(user_id=user_id).get(machinerating_id=machine_rating_id)
#             return Response({'status': 'error', 'message': 'user and machine rating already added'})
#         except:
#             pass
#         UserMachineRating.objects.create(user_id=user_id, machinerating_id=machine_rating_id)
#         return Response({'status': 'success', 'message': 'machine rating added to user model'})
