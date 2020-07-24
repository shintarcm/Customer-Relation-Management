import NetworkUtils from '../Network/NetworkUtils';

export default class ServiceDetailsService {
  saveServiceDetailsCallBack = null;

  saveServiceDetailsSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.saveServiceDetailsCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }
  saveServiceDetailsError(responseJson) {
    this.saveServiceDetailsCallBack(responseJson);
  }
  saveServiceDetail(
    user_id,
    customer_id,
    machine_serial_no,
    problem,
    rectification,
    date_of_complaint,
    date_of_completion,
    cost,
    payment_status,
    path,
    saveServiceDetailsCallBack,
  ) {
    this.saveServiceDetailsCallBack = saveServiceDetailsCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      user_id: user_id,
      customer_id: customer_id,
      machine_serial_no: machine_serial_no,
      date_of_complaint: date_of_complaint,
      date_of_completion: date_of_completion,
      problem: problem,
      rectification: rectification,
      cost: cost,
      payment_status: payment_status,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.saveServiceDetailsSuccess.bind(this),
      this.saveServiceDetailsError.bind(this),
    );
  }
}
