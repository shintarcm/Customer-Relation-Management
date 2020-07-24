import NetworkUtils from '../Network/NetworkUtils';

export default class SendEmailService {
  getDetailsCallBack = null;
  sendEmailCallBack = null;

  getDetailsSuccess(responseJson) {
    this.getDetailsCallBack(responseJson);
  }
  getDetailsError(error) {
    console.log(error);
  }
  getDetails(service_id, path, getDetailsCallBack) {
    this.getDetailsCallBack = getDetailsCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      service_id: service_id,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.getDetailsSuccess.bind(this),
      this.getDetailsError.bind(this),
    );
  }
  sendEmailSuccess(responseJson) {
    this.sendEmailCallBack(responseJson);
  }
  sendEmailError(error) {
    console.log(error);
  }
  sendEmail(message, user_email, customer_email, path, sendEmailCallBack) {
    this.sendEmailCallBack = sendEmailCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      message: message,
      user_email: user_email,
      customer_email: customer_email,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.sendEmailSuccess.bind(this),
      this.sendEmailError.bind(this),
    );
  }
}
