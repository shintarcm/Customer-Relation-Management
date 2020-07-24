import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import sharedPreferences from '../SharedPreferences';
import SimpleToast from 'react-native-simple-toast';
import ServiceDetailsService from '../Service/ServiceDetailsService';

class ServiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machine_serial_no: '',
      date_of_complaint: new Date(),
      date_of_completion: new Date(),
      problem: '',
      rectification: '',
      cost: '',
      payment_status: '',
    };
  }
  saveServiceDetailsCallBack(responseJson) {
    if (responseJson.status === 'success') {
      SimpleToast.show(responseJson.message);
      sharedPreferences.service_id = responseJson.service_id;
      this.props.navigation.navigate('EmailScreen');
    } else {
      SimpleToast.show(responseJson.errors);
    }
  }
  render() {
    let payment = [
      {
        value: 'paid',
      },
      {
        value: 'pending',
      },
    ];
    const {
      textInputStyle,
      containerStyles,
      overlayStyles,
      pickerStyles,
      buttonStyle,
      textStyle,
      headerStyle,
    } = styles;
    return (
      <ScrollView style={{backgroundColor: 'black', flex: 1}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={headerStyle}>Service Details</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>MachineSerialNo:</Text>
          <TextInput
            style={textInputStyle}
            placeholder={'enter machine serial number'}
            placeholderTextColor={'white'}
            keyboardType={'numeric'}
            value={this.state.machine_serial_no}
            onChangeText={val => {
              this.setState({machine_serial_no: val});
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>DateOfComplaint:</Text>
          <DatePicker
            date={this.state.date_of_complaint}
            format={'YYYY-MM-DD'}
            onDateChange={date => {
              this.setState({date_of_complaint: date});
            }}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>DateOfCompletion:</Text>
          <DatePicker
            date={this.state.date_of_completion}
            format={'YYYY-MM-DD'}
            onDateChange={date => {
              this.setState({date_of_completion: date});
            }}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Problem:</Text>
          <TextInput
            style={textInputStyle}
            placeholder={'problem'}
            placeholderTextColor={'white'}
            value={this.state.problem}
            onChangeText={val => {
              this.setState({problem: val});
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Rectification:</Text>
          <TextInput
            style={textInputStyle}
            placeholder={'rectification'}
            placeholderTextColor={'white'}
            value={this.state.rectification}
            onChangeText={val => {
              this.setState({rectification: val});
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Cost:</Text>
          <TextInput
            style={textInputStyle}
            placeholder={'enter the cost'}
            placeholderTextColor={'white'}
            keyboardType={'numeric'}
            value={this.state.cost}
            onChangeText={val => {
              this.setState({cost: val});
            }}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>PaymentStatus:</Text>
          <Dropdown
            label={'payment status'}
            data={payment}
            onChangeText={value => {
              this.setState({payment_status: value});
            }}
            fontSize={16}
            labelFontSize={16}
            baseColor={'#fff'}
            textColor={'#fff'}
            itemColor={'#fff'}
            selectedItemColor={'#FFFF00'}
            dropdownPosition={0}
            containerStyle={containerStyles}
            overlayStyle={overlayStyles}
            pickerStyle={pickerStyles}
          />
        </View>
        <View style={{paddingTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              new ServiceDetailsService().saveServiceDetail(
                sharedPreferences.email_id,
                sharedPreferences.customer_id,
                this.state.machine_serial_no,
                this.state.problem,
                this.state.rectification,
                this.state.date_of_complaint,
                this.state.date_of_completion,
                this.state.cost,
                this.state.payment_status,
                '/service/save_service_details',
                this.saveServiceDetailsCallBack.bind(this),
              );
            }}>
            <View style={buttonStyle}>
              <Text style={{alignContent: 'center'}}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = {
  textInputStyle: {
    height: 50,
    width: 220,
    marginTop: 5,
    padding: 7,
    fontSize: 15,
    borderWidth: 1,
    color: 'white',
    borderColor: '#fff',
  },
  containerStyles: {
    width: 140,
  },
  overlayStyles: {
    backgroundColor: '#000',
    flex: 1,
  },
  pickerStyles: {
    backgroundColor: '#000',
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
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
  headerStyle: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 130,
  },
};

export default ServiceDetails;
