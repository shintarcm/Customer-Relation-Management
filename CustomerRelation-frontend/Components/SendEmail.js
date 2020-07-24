import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SendEmailService from '../Service/SendEmailService';
import sharedPreferences from '../SharedPreferences';
import SimpleToast from 'react-native-simple-toast';

class SendEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {},
      user_email: '',
      cust_email: '',
    };
  }
  componentDidMount(): void {
    let sendEmailService = new SendEmailService();
    sendEmailService.getDetails(
      sharedPreferences.service_id,
      '/service/get_service_details',
      this.getDetailsCallBack.bind(this),
    );
  }
  getDetailsCallBack(responseJson) {
    if (responseJson.status === 'success') {
      this.setState({message: responseJson.data});
      this.setState({user_email: responseJson.user_email});
      this.setState({customer_email: responseJson.customer_email});
    } else {
      SimpleToast.show(responseJson.errors);
    }
  }

  sendEmailCallBack(responseJson) {
    if (responseJson.status === 'success') {
      SimpleToast.show(responseJson.message);
    } else {
      SimpleToast.show(responseJson.errors);
    }
  }

  render() {
    const {headerStyle, textStyle, labelStyle, buttonStyle} = styles;
    return (
      <ScrollView style={{backgroundColor: 'black', flex: 1}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={headerStyle}>Send Email</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            MachineSerialNumber:
            <Text style={textStyle}>
              {this.state.message.machine_serial_no}
            </Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            DateOfComplaint:
            <Text style={textStyle}>
              {this.state.message.date_of_complaint}
            </Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            DateOfCompletion:
            <Text style={textStyle}>
              {this.state.message.date_of_completion}
            </Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            Problem:
            <Text style={textStyle}>{this.state.message.problem}</Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            Rectification:
            <Text style={textStyle}>{this.state.message.rectification}</Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            Cost:
            <Text style={textStyle}>{this.state.message.cost}</Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            PaymentStatus:
            <Text style={textStyle}>{this.state.message.payment_status}</Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            Employee Email:
            <Text style={textStyle}>{this.state.user_email}</Text>
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={labelStyle}>
            Customer Email:
            <Text style={textStyle}>{this.state.customer_email}</Text>
          </Text>
        </View>

        <View style={{paddingTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              new SendEmailService().sendEmail(
                this.state.message,
                this.state.user_email,
                this.state.customer_email,
                '/email/send_email',
                this.sendEmailCallBack.bind(this),
              );
            }}>
            <View style={buttonStyle}>
              <Text style={{alignContent: 'center'}}>Send Email</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 130,
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
    paddingTop: 20,
  },
  labelStyle: {
    color: '#E7C107',
    fontSize: 18,
    paddingTop: 20,
  },
  buttonStyle: {
    height: 35,
    width: 100,
    marginTop: 10,
    padding: 6,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E7C107',
    backgroundColor: '#E7C107',
    alignSelf: 'center',
    justifyContent: 'center',
  },
};

export default SendEmail;
