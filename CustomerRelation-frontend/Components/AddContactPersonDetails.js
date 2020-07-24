import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import sharedPreferences from '../SharedPreferences';
import CustomerDetailsService from '../Service/CustomerDetailsService';
import SimpleToast from 'react-native-simple-toast';
import {Dialog} from 'react-native-simple-dialogs';

class AddContactPersonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      contact_person_name: '',
      email_id: '',
      mobile_no: '',
    };
  }

  addContactPersonDetailCallBack(response) {
    if (response.status === 'success') {
      SimpleToast.show(response.message);
      this.props.updateVisibility(false);
      this.setState({contact_person_name: ''});
      this.setState({email_id: ''});
      this.setState({mobile_no: ''});
    } else {
      SimpleToast.show(response.errors);
      this.setState({contact_person_name: ''});
      this.setState({email_id: ''});
      this.setState({mobile_no: ''});
    }
  }
  render() {
    const {buttonStyle, textInputStyle} = styles;
    console.log('state of dialog', this.state.dialogContactVisible);
    return (
      <Dialog
        visible={this.props.dialogContactVisible}
        dialogStyle={{
          backgroundColor: 'black',
          borderColor: 'white',
          borderWidth: 1,
        }}
        onTouchOutside={() => this.props.updateVisibility(false)}>
        <TextInput
          style={textInputStyle}
          placeholder={'enter contact person name'}
          placeholderTextColor={'white'}
          value={this.state.contact_person_name}
          onChangeText={val => {
            this.setState({contact_person_name: val});
          }}
        />
        <TextInput
          style={textInputStyle}
          placeholder={'enter the email'}
          placeholderTextColor={'white'}
          value={this.state.email_id}
          onChangeText={val => {
            this.setState({email_id: val});
          }}
        />
        <TextInput
          style={textInputStyle}
          placeholder={'enter the mobile no'}
          placeholderTextColor={'white'}
          value={this.state.mobile_no}
          onChangeText={val => {
            this.setState({mobile_no: val});
          }}
        />
        <View style={{paddingTop: 7}}>
          <TouchableOpacity
            onPress={() => {
              new CustomerDetailsService().addContactPersonDetail(
                this.state.contact_person_name,
                this.state.email_id,
                this.state.mobile_no,
                sharedPreferences.company_id,
                '/customer/addContactPersonDetails',
                this.addContactPersonDetailCallBack.bind(this),
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
export default AddContactPersonDetails;
