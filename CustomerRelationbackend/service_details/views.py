from venv import logger

from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from register.models import User
from .models import ServiceDetails
from customer_details.models import ContactPerson
from .serializer import ServiceDetailsSerializer

class SaveServiceDetails(APIView):

    def post(self, request):
        data = request.data
        logger.error('hello save')
        user_id = data['user_id']
        customer_id = data['customer_id']
        machine_serial_no = data['machine_serial_no']
        date_of_complaint = data['date_of_complaint']
        date_of_completion = data['date_of_completion']
        problem = data['problem']
        rectification = data['rectification']
        cost = data['cost']
        payment_status = data['payment_status']
        try:
            User.objects.filter(id=user_id)
        except:
            return Response({'status': 'error', 'errors': 'user does not exists'})
        service = ServiceDetails.objects.create(user_id=user_id, customer_id=customer_id,
                                                machine_serial_no=machine_serial_no,
                                                date_of_complaint=date_of_complaint,
                                                date_of_completion=date_of_completion,
                                                problem=problem, rectification=rectification, cost=cost,
                                                payment_status=payment_status)
        return Response(
            {'status': 'success', 'message': 'service details added successfully', 'service_id': service.id})


class GetServiceDetails(APIView):
    serializer = ServiceDetailsSerializer

    def post(self, request):
        logger.error('hello')
        data = request.data
        service_id = data['service_id']
        logger.error(service_id)
        try:
            details = ServiceDetails.objects.get(id=service_id)
        except:
            return Response({'status':'error','errors':'service details does not exists!!'})
        logger.error(details.user)
        user = User.objects.get(username=details.user)
        email = user.email
        logger.error(email)
        customer = ContactPerson.objects.get(contactPersonName=details.customer)
        cust_email = customer.contactPersonEmailId
        logger.error(cust_email)
        serializer_details = self.serializer(details)
        return Response({'status':'success','data':serializer_details.data,'user_email':email,'customer_email':cust_email})
