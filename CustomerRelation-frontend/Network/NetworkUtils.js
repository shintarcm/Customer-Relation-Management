export default class NetworkUtils {
  static URL = 'http://your ip:8000';

  get(path, successCallBack, errorCallBack) {
    fetch(NetworkUtils.URL + path, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(responseBody => {
        console.log('response body', responseBody);
        successCallBack(responseBody);
      })
      .catch(errors => {
        errorCallBack(errors);
      });
  }

  post(path, headers, data, successCallBack, errorCallBack) {
    if (headers === null) {
      headers = {};
    }
    console.log('this is data', JSON.stringify(data));

    fetch(NetworkUtils.URL + path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log('this is response', JSON.stringify(response));
        return response.json();
      })
      .then(responseBody => {
        console.log('this is response body', responseBody);
        console.log('this is response json', responseBody.errors);
        if (responseBody.status === 'success') {
          successCallBack(responseBody);
        } else {
          let errors = responseBody;
          throw errors;
        }
      })
      .catch(errors => {
        console.log('error');
        console.log('this is errors', errors.errors);
        errorCallBack(errors);
      });
  }
}
