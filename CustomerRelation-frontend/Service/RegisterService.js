import NetworkUtils from '../Network/NetworkUtils';

export default class RegisterService {
  uiCallBack = null;
  registerSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.uiCallBack(responseJson.status);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }

  registerError(response) {
    if (response.errors.username) {
      console.log('this is register service', response.errors.username);
      this.uiCallBack(response.errors.username[0]);
      return;
    }
    if (response.errors.email) {
      this.uiCallBack(response.errors.email[0]);
      return;
    }
    if (response.errors.password) {
      this.uiCallBack(response.errors.password[0]);
      return;
    }
    if (response.errors.confirm_password) {
      this.uiCallBack(response.errors.confirm_password[0]);
      return;
    }
  }

  registerUser(username, email, password, confirm_password, uiCallBack) {
    this.uiCallBack = uiCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password,
    };
    networkUtils.post(
      '/user/register',
      {},
      data,
      this.registerSuccess.bind(this),
      this.registerError.bind(this),
    );
  }
}
