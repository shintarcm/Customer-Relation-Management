import NetworkUtils from '../Network/NetworkUtils';
import sharedPreferences from '../SharedPreferences';

export default class MachineDetailsService {
  getCallBack = null;
  addCallBack = null;
  saveCallBack = null;

  machineDetailsSuccess(responseJson) {
    this.getCallBack(responseJson);
  }

  machineDetailsError(error) {
    console.log(error);
  }

  machineTypeList(getCallBack) {
    this.getCallBack = getCallBack;
    let networkUtils = new NetworkUtils();
    networkUtils.get(
      '/machine/get_machine_detail',
      this.machineDetailsSuccess.bind(this),
      this.machineDetailsError.bind(this),
    );
  }

  addMachineDetailSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.addCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }
  addMachineDetailError(responseJson) {
    if (responseJson.status === 'error') {
      this.addCallBack(responseJson);
    }
  }
  addMachineDetail(value, path, addCallBack) {
    this.addCallBack = addCallBack;

    let networkUtils = new NetworkUtils();
    let data = {
      data: value,
    };
    networkUtils.post(
      path,
      {},
      data,
      this.addMachineDetailSuccess.bind(this),
      this.addMachineDetailError.bind(this),
    );
  }
  saveMachineDetailSuccess(responseJson) {
    if (responseJson.status === 'success') {
      this.saveCallBack(responseJson);
    } else {
      let error = responseJson.errors;
      throw error;
    }
  }
  saveMachineDetailError(responseJson) {
    this.saveCallBack(responseJson);
  }
  saveMachineDetail(type, name, make, rating, saveCallBack) {
    this.saveCallBack = saveCallBack;
    let networkUtils = new NetworkUtils();
    let data = {
      user_id: sharedPreferences.email_id,
      machine_type: type,
      machine_name: name,
      machine_make: make,
      machine_rating: rating,
    };
    networkUtils.post(
      '/machine/save_machine_details',
      {},
      data,
      this.saveMachineDetailSuccess.bind(this),
      this.saveMachineDetailError.bind(this),
    );
  }
}
