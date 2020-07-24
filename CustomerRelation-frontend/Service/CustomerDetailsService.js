import NetworkUtils from '../Network/NetworkUtils';

export default class CustomerDetailsService {
  getCallBack = null;
  addCompanyCallBack = null;
  getContactPersonCallBack = null;
  addContactPersonCallBack = null;
  getContactPersonDetailsCallBack = null;
  saveCustomerDetailCallBack = null;

  companyNameSuccess(responseJson) {
    this.getCallBack(responseJson);
  }

  companyNameError(error) {
    console.log(error);
  }

  addCompanyDetailSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.addCompanyCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }

  addCompanyDetailError(responseJson) {
    this.addCompanyCallBack(responseJson);
  }

  getContactPersonSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.getContactPersonCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }

  getContactPersonError(responseJson) {
    this.getContactPersonCallBack(responseJson);
  }

  addCompanyDetail(name, address, path, addCompanyCallBack) {
    this.addCompanyCallBack = addCompanyCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      company_name: name,
      address: address,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.addCompanyDetailSuccess.bind(this),
      this.addCompanyDetailError.bind(this),
    );
  }
  getContactPersonDetailsSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.getContactPersonDetailsCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }

  getContactPersonDetailsError(responseJson) {
    this.getContactPersonDetailsCallBack(responseJson);
  }
  saveCustomerDetailSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.saveCustomerDetailCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }
  saveCustomerDetailError(responseJson) {
    this.saveCustomerDetailCallBack(responseJson);
  }
  companyNameList(getCallBack) {
    this.getCallBack = getCallBack;
    let networkUtils = new NetworkUtils();
    networkUtils.get(
      '/customer/getCompany',
      this.companyNameSuccess.bind(this),
      this.companyNameError.bind(this),
    );
  }
  getContactPersonList(company_name, getContactPersonCallBack) {
    this.getContactPersonCallBack = getContactPersonCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      company_name: company_name,
    };
    networkUtils.post(
      '/customer/selectCompany',
      {},
      data,
      this.getContactPersonSuccess.bind(this),
      this.getContactPersonError.bind(this),
    );
  }
  addContactPersonSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.addContactPersonCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }
  addContactPersonError(responseJson) {
    this.addContactPersonCallBack(responseJson);
  }
  addContactPersonDetail(
    name,
    email,
    mobile,
    company_id,
    path,
    addContactPersonCallBack,
  ) {
    this.addContactPersonCallBack = addContactPersonCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      company_id: company_id,
      contact_person_name: name,
      email_id: email,
      mobile_no: mobile,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.addContactPersonSuccess.bind(this),
      this.addContactPersonError.bind(this),
    );
  }
  getContactPersonDetails(name, path, getContactPersonDetailsCallBack) {
    this.getContactPersonDetailsCallBack = getContactPersonDetailsCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      contact_person_name: name,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.getContactPersonDetailsSuccess.bind(this),
      this.getContactPersonDetailsError.bind(this),
    );
  }
  saveCustomerDetail(
    user_id,
    company_id,
    name,
    email,
    mobile,
    path,
    saveCustomerDetailsCallBack,
  ) {
    this.saveCustomerDetailCallBack = saveCustomerDetailsCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      user_id: user_id,
      company_id: company_id,
      contact_person_name: name,
      contact_person_email: email,
      contact_person_mobile_no: mobile,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.saveCustomerDetailSuccess.bind(this),
      this.saveCustomerDetailError.bind(this),
    );
  }
}
