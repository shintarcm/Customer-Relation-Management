import NetworkUtils from '../Network/NetworkUtils';
import sharedPreferences from '../SharedPreferences';

export default class LoginService {
  uiCallBack = null;
  loginSuccess(response) {
    if (response.status === 'success') {
      sharedPreferences.email_id = response.message;
      this.uiCallBack(response);
    } else {
      let errors = response;
      throw errors;
    }
  }
  loginError(response) {
    this.uiCallBack(response);
  }

  loginUser(email, password, uiCallBack) {
    this.uiCallBack = uiCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      email: email,
      password: password,
    };
    networkUtils.post(
      '/user/login',
      {},
      data,
      this.loginSuccess.bind(this),
      this.loginError.bind(this),
    );
  }
}
