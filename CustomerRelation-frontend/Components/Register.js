import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import RegisterService from '../Service/RegisterService';
import SimpleToast from 'react-native-simple-toast';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      display: '',
    };
  }

  displayView(status) {
    if (status === 'success') {
      SimpleToast.show('User registered successfully!!');
      this.props.navigation.navigate('LogScreen');
    } else {
      console.log('this is register error', status);
      this.setState({display: status});
    }
  }
  render() {
    const {textInputStyle, buttonStyle, displayStyle} = styles;
    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <View style={{paddingLeft: 25, paddingTop: 20}}>
          <TextInput
            style={textInputStyle}
            placeholder={'enter your username'}
            placeholderTextColor={'#fff'}
            label={'Username'}
            value={this.state.username}
            onChangeText={val => {
              this.setState({username: val});
            }}
          />
          <TextInput
            style={textInputStyle}
            placeholder={'enter your email id'}
            placeholderTextColor={'#fff'}
            label={'Email'}
            value={this.state.email}
            onChangeText={val => {
              this.setState({email: val});
            }}
          />
          <TextInput
            style={textInputStyle}
            placeholder={'enter your password'}
            placeholderTextColor={'#fff'}
            label={'Password'}
            value={this.state.password}
            onChangeText={val => {
              this.setState({password: val});
            }}
            secureTextEntry={true}
          />
          <TextInput
            style={textInputStyle}
            placeholder={'confirm your password'}
            placeholderTextColor={'#fff'}
            label={'Confirm Password'}
            value={this.state.confirm_password}
            onChangeText={val => {
              this.setState({confirm_password: val});
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={{paddingTop: 30}}>
          <TouchableOpacity
            onPress={() => {
              new RegisterService().registerUser(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.confirm_password,
                this.displayView.bind(this),
              );
            }}>
            <View style={buttonStyle}>
              <Text style={{justifyContent: 'center', fontSize: 20}}>
                Register!!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 30, paddingTop: 30}}>
          <Text style={{color: 'white'}}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('LogScreen');
            }}>
            <Text style={{color: 'white'}}>Login!!</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'black'}}>
          <Text style={displayStyle}>{this.state.display}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  textInputStyle: {
    height: 50,
    width: 300,
    marginTop: 20,
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
    marginRight: 20,
    marginTop: 20,
  },
};

export default Register;
