from venv import logger

from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import SendEmailSerializer
from django.core.mail import send_mail


# Create your views here.

class EmailView(APIView):
    def post(self, request, *args, **kwargs):
        # logger.error(request.data)
        # serializer = SendEmailSerializer(request.data)
        # logger.error(serializer.data)
        data = request.data
        if data['message']:
            msg = data['message']
            # logger.error(msg)
            user_email = data['user_email']
            # logger.error(user_email)
            cust_email = data['customer_email']
            msg = data['message']
            send_mail(
                'Sent email from {}'.format(user_email),
                'The serial number of the machine serviced is {d1}.Problem found is:{d2}.Rectification:{d3}.Complaint registered on {d4}.Service completed on {d5}.Total cost for the service is {d6}.Payment status:{d7}'.format(
                    d1=msg['machine_serial_no'], d2=msg['problem'],
                    d3=msg['rectification'], d4=msg['date_of_complaint'],
                    d5=msg['date_of_completion'], d6=msg['cost'],
                    d7=msg['payment_status']),
                'matahariservices2000@gmail.com',
                [cust_email, 'shintarcm@gmail.com'],
                fail_silently=False,
            )
            return Response({'status': 'success', 'message': 'email sent successfully!!'})
        return Response({'status': "error", "errors": status.HTTP_400_BAD_REQUEST})


from googlevoice import Voice
from googlevoice.util import input
