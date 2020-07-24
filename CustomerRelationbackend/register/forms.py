from venv import logger

from django import forms
from django.contrib.auth.models import User
from rest_framework.response import Response

from .models import User
from django.core.validators import EmailValidator


class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(max_length=6, widget=forms.PasswordInput)
    confirm_password = forms.CharField(max_length=6, widget=forms.PasswordInput)

    class Meta:
        model = User
        exclude = ['date_joined']

    def is_valid(self):
        valid = super(UserRegistrationForm, self).is_valid()
        if not valid:
            return False
        data = self.cleaned_data
        username = data['username']
        password = data['password']
        confirm_password = data['confirm_password']
        email = data['email']
        if not username:
            valid = False
            self.errors['username'] = [u'username cannot be empty']
            return Response({'status'})
        if not email:
            valid = False
            self.errors['email'] = [u'email cannot be empty']
            return False
        if not password:
            valid = False
            self.errors['password'] = [u'password field cannot be empty']
            return False
        if not confirm_password:
            valid = False
            self.errors['confirm_password'] = [u'confirm password field cannot be empty']
            return False
        if EmailValidator(email):
            if email:
                try:
                    if User.objects.get(email=email):
                        try:
                            self.errors['email'] = [u'email already exists']
                            return False
                        except:
                            pass
                except:
                    pass
            if len(password) <= 6:
                if confirm_password == password:
                    return True
                else:
                    self.errors['confirm_password'] = [u'passwords doesnt match']
                    return False

            else:
                self.errors['password'] = [u'password must be 6 characters long']
                return False
        else:
            self.errors['email'] = [u'email is invalid']
            return False


    def save(self):
        data = self.cleaned_data
        user = User.objects.create(username=data['username'], email=data['email'], is_active=True,password=data['password'])
        logger.error(user)
        return user
