from venv import logger

from .serializer import CompanySerializer,ContactPersonSerializer,CompanyContactPersonSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Company,ContactPerson,CustomerDetails

# Create your views here.


class AddCompany(APIView):
    serializer = CompanySerializer

    def post(self,request):
        data = request.data
        company = data['company_name']
        address = data['address']
        if not company:
            return Response({'status':'error','errors':'company name cannot be empty'})
        if not address:
            return Response({'status':'error','errors':'address cannot be empty'})
        try:
            Company.objects.get(company=company)
            return Response({'status':'error','errors':'Company name already exists'})
        except:
            pass
        Company.objects.create(company=company,companyAddress=address)
        return Response({'status':'success','message':'Company name added successfully!!'})


class GetCompany(APIView):
    serializer = CompanySerializer

    def get(self,request):
        company_list = Company.objects.only('company')
        data = self.serializer(company_list,many=True)
        return Response(data.data)


class SelectCompany(APIView):
    serializer = ContactPersonSerializer
    def post(self,request):
        data = request.data
        company = data['company_name']
        if not company:
            return Response({'status':'error','errors':'company name cannot be empty'})
        try:
            cpy = Company.objects.get(company=company)
            logger.error('hello1')
            company_id = cpy.id
        except:
            return Response({'status':'error','errors':'company name does not exists'})
        try:
            logger.error('hello2')
            ContactPerson.objects.filter(company_id = company_id)
            logger.error('hello3')
        except:
            return Response({'status':'error','company_id':company_id})
        data = ContactPerson.objects.filter(company_id = company_id)
        name = data.only('contactPersonName')
        serializer_data=self.serializer(name,many=True)
        return Response({'status':'success','data':serializer_data.data,'company_id':company_id})


class SelectContactPersonName(APIView):

    def post(self,request):
        data = request.data
        contact_person_name = data['contact_person_name']
        try:
            ContactPerson.objects.get(contactPersonName=contact_person_name)
        except:
            return Response({'status':'error','errors':'contact person name does not exists'})
        contact_person_details = ContactPerson.objects.get(contactPersonName=contact_person_name)
        email = contact_person_details.contactPersonEmailId
        mobile_no = contact_person_details.contactPersonMobileNumber
        return Response({'status':'success','email':email,'mobile_no':mobile_no})


class AddContactPersonDetails(APIView):

    def post(self,request):
        data = request.data
        company_id = data['company_id']
        contact_person_name = data['contact_person_name']
        email_id = data['email_id']
        mobile_no = data['mobile_no']
        if not contact_person_name:
            return Response({'status':'error','errors':'contact person cannot be empty'})
        if not email_id:
            return Response({'status':'error','errors':'contact person email cannot be empty'})
        if not mobile_no:
            return Response({'status':'error','errors':'contact person mobile number cannot be empty'})
        try:
            Company.objects.get(id=company_id)
        except:
            return Response({'status':'error','errors':'company does not exists'})
        try:
            ContactPerson.objects.get(contactPersonName=contact_person_name)
            return Response({'status':'error','errors':'contact person details already exists'})
        except:
            pass
        ContactPerson.objects.create(company_id=company_id,contactPersonName=contact_person_name,
                                     contactPersonEmailId=email_id,contactPersonMobileNumber=mobile_no)
        return Response({'status':'success','message':'contact person details added successfully'})


class SaveContactPersonDetails(APIView):

    def post(self,request):
        data = request.data
        user_id = data['user_id']
        company = data['company_id']
        contact_person_name = data['contact_person_name']
        contact_person_email = data['contact_person_email']
        contact_person_mobile_no = data['contact_person_mobile_no']
        try:
            comp = ContactPerson.objects.filter(company_id=company)
            data = comp.get(contactPersonName=contact_person_name)
            logger.error(data)
            data_id = data.id
            logger.error(data_id)
            CustomerDetails.objects.create(customer_details_id=data_id,user_id=user_id)
            return Response({'status':'success','message':'customer details saved','customer_id':data_id})
        except:
            return Response({'status':'error','errors':'contact person details does not exists'})