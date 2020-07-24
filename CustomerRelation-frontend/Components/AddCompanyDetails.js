import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import CustomerDetailsService from '../Service/CustomerDetailsService';
import SimpleToast from 'react-native-simple-toast';
import {Dialog} from 'react-native-simple-dialogs';

class AddCompanyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      company_name: '',
      company_address: '',
    };
  }

  addCompanyDetailCallBack(response) {
    if (response.status === 'success') {
      SimpleToast.show(response.message);
      this.props.update(false);
      this.setState({company_name: ''});
      this.setState({company_address: ''});
    } else {
      SimpleToast.show(response.errors);
      this.setState({company_name: ''});
      this.setState({company_address: ''});
    }
  }
  render() {
    const {buttonStyle, textInputStyle} = styles;
    console.log('state of dialog', this.state.dialogCompanyVisible);
    return (
      <Dialog
        visible={this.props.dialogCompanyVisible}
        dialogStyle={{
          backgroundColor: 'black',
          borderColor: 'white',
          borderWidth: 1,
        }}
        onTouchOutside={() => this.props.update(false)}>
        <TextInput
          style={textInputStyle}
          placeholder={'enter company name'}
          placeholderTextColor={'white'}
          value={this.state.company_name}
          onChangeText={val => {
            this.setState({company_name: val});
          }}
        />
        <TextInput
          style={textInputStyle}
          placeholder={'enter the address'}
          placeholderTextColor={'white'}
          value={this.state.company_address}
          onChangeText={val => {
            this.setState({company_address: val});
          }}
        />
        <View style={{paddingTop: 7}}>
          <TouchableOpacity
            onPress={() => {
              new CustomerDetailsService().addCompanyDetail(
                this.state.company_name,
                this.state.company_address,
                '/customer/addCompany',
                this.addCompanyDetailCallBack.bind(this),
              );
            }}>
            <View style={buttonStyle}>
              <Text style={{justifyContent: 'center', fontSize: 16}}>
                Add Detail
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Dialog>
    );
  }
}
const styles = {
  buttonStyle: {
    height: 35,
    width: 100,
    marginTop: 1,
    padding: 4,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E7C107',
    backgroundColor: '#E7C107',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 50,
    width: 250,
    marginTop: 5,
    padding: 7,
    fontSize: 15,
    borderWidth: 1,
    color: 'white',
    borderColor: '#fff',
  },
};
export default AddCompanyDetails;
