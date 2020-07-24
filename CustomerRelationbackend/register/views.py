from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework.response import Response
import logging
from django.contrib.auth import authenticate, user_logged_in
from .models import User
import django.contrib.auth.password_validation as validators

from .forms import UserRegistrationForm


# Create your views here.
class Register(APIView):
    def post(self, request):
        logger = logging.getLogger('request')
        logger.error(request.data)
        userRegistrationForm = UserRegistrationForm(request.data)
        if userRegistrationForm.is_valid():
            userRegistrationForm.save()
            logger.error(Response({'status':'success','message':'user registered successfully'}))
            return Response({'status': 'success', 'message': 'user registered successfully'})
        else:
            return Response({'status': 'error', 'errors': userRegistrationForm.errors})


class Login(APIView):
    def post(self, request):
        logger = logging.getLogger('request')
        logger.error(request.data)
        data = request.data
        email = data['email']
        password = data['password']
        if not email:
            return Response({'status':'error','errors':'email cannot be empty'})
        if not password:
            return Response({'status':'error','errors':'password cannot be empty'})
        try:
            user = User.objects.all().get(email=email)
            logger.error(user)
            user_id = user.id
            logger.error(user.password)
            if user.password==password:
                logger.error("hello")
                user_logged_in.send(sender=user.__class__,request=request, user=user)
                return Response({'status':'success','message':user_id})
            else:
                return Response({'status':'error','errors':'password doesn \'t match'},status=400)
        except User.DoesNotExist:
            return Response({'status':'error','errors':'email or password doesn\'t exist'},status=400)

