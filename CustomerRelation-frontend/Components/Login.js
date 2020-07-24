import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import LoginService from '../Service/LoginService';
import SimpleToast from 'react-native-simple-toast';
import sharedPreferences from '../SharedPreferences';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      display: '',
    };
  }
  displayView(status) {
    if (status.status === 'success') {
      sharedPreferences.email_id = status.message;
      SimpleToast.show('user logged in successfully');
      this.props.navigation.navigate('Home');
    } else {
      this.setState({display: status.errors});
    }
  }
  render() {
    const {textInputStyle, buttonStyle, displayStyle} = styles;
    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <View style={{paddingLeft: 25, paddingTop: 90}}>
          <TextInput
            style={textInputStyle}
            placeholder={'enter your email id'}
            placeholderTextColor={'white'}
            label={'Email'}
            value={this.state.email}
            onChangeText={val => {
              this.setState({email: val});
            }}
          />
          <TextInput
            style={textInputStyle}
            placeholder={'enter your password'}
            placeholderTextColor={'white'}
            label={'Password'}
            value={this.state.password}
            onChangeText={val => {
              this.setState({password: val});
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={{paddingTop: 30, paddingLeft: 20}}>
          <TouchableOpacity
            onPress={() => {
              new LoginService().loginUser(
                this.state.email,
                this.state.password,
                this.displayView.bind(this),
              );
            }}>
            <View style={buttonStyle}>
              <Text style={{justifyContent: 'center', fontSize: 20}}>
                Login!!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={displayStyle}>{this.state.display}</Text>
      </View>
    );
  }
}

const styles = {
  textInputStyle: {
    height: 50,
    width: 300,
    marginTop: 30,
    padding: 4,
    fontSize: 15,
    borderWidth: 1,
    color: 'white',
    borderColor: '#fff',
  },
  buttonStyle: {
    height: 35,
    width: 100,
    marginTop: 15,
    padding: 6,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E7C107',
    backgroundColor: '#E7C107',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  displayStyle: {
    color: 'red',
    paddingRight: 20,
    paddingTop: 20,
    marginRight: 20,
  },
};

export default Login;
