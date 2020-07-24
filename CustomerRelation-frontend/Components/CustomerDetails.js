import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {Icon} from 'react-native-elements';
import sharedPreferences from '../SharedPreferences';
import CustomerDetailsService from '../Service/CustomerDetailsService';
import AddCompanyDetails from './AddCompanyDetails';
import SimpleToast from 'react-native-simple-toast';
import AddContactPersonDetails from './AddContactPersonDetails';

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogCompanyVisible: false,
      dialogContactVisible: false,
      company_name: [],
      company_name_data: '',
      contact_person_name_list: [],
      contact_person_name: ' ',
      contact_person_email: 'select contact person name',
      contact_person_mobile: 'select contact person name',
    };
  }

  componentDidMount() {
    console.log('component did mount!!');
    this.onChangeText();
  }

  onChangeText() {
    let customerDetailsService = new CustomerDetailsService();
    customerDetailsService.companyNameList(this.setCompanyName.bind(this));
  }

  setCompanyName(values) {
    let count = Object.keys(values).length;
    let comp_name = [];
    for (let i = 0; i < count; i++) {
      console.log('saf', values[i]);
      comp_name.push({value: values[i].company});
    }
    this.setState({company_name: comp_name});
    // type_data = type;
    console.log('this is comp name', this.state.company_name);
  }

  update = dialogCompanyVisible => {
    this.setState({dialogCompanyVisible: dialogCompanyVisible});
    this.onChangeText();
  };

  updateVisibility = dialogContactVisible => {
    this.setState({dialogContactVisible: dialogContactVisible});
    this.refresh();
  };

  getContactPersonCallBack(val) {
    if (val.status === 'success') {
      let values = val.data;
      let count = Object.keys(values).length;
      let contact_person = [];
      for (let i = 0; i < count; i++) {
        console.log('contact person', values[i]);
        contact_person.push({value: values[i].contactPersonName});
      }
      this.setState({contact_person_name_list: contact_person});
      sharedPreferences.company_id = val.company_id;
    }
    if (val.company_id && val.status === 'error') {
      sharedPreferences.company_id = val.company_id;
      this.setState({contact_person_name_list: ''});
      SimpleToast.show('add contact person details');
    } else {
      SimpleToast.show(val.errors);
    }
  }

  getContactPersonDetailsCallBack(responseJson) {
    console.log('this is contact person');
    if (responseJson.status === 'success') {
      this.setState({contact_person_email: responseJson.email});
      this.setState({contact_person_mobile: responseJson.mobile_no});
      console.log('this is email', this.state.contact_person_email);
    } else {
      SimpleToast.show(responseJson.errors);
    }
  }

  refresh() {
    let customerDetailsService = new CustomerDetailsService();
    customerDetailsService.getContactPersonList(
      this.state.company_name_data,
      this.getContactPersonCallBack.bind(this),
    );
  }

  onSelect(value) {
    this.setState({company_name_data: value});
    this.onChangeText();
    this.setState({contact_person_name_list: []});
    this.refresh();
  }

  onSelectContactPerson(val) {
    this.setState({contact_person_name: val});
    let customerDetailsService = new CustomerDetailsService();
    customerDetailsService.getContactPersonDetails(
      this.state.contact_person_name,
      '/customer/selectContactPersonName',
      this.getContactPersonDetailsCallBack.bind(this),
    );
  }
  saveCustomerDetailCallBack(responseJson) {
    // const {navigate} = this.props.navigation;
    if (responseJson.status === 'success') {
      console.log('saved customer details');
      sharedPreferences.customer_id = responseJson.customer_id;
      SimpleToast.show(responseJson.message);
      return this.props.navigation.navigate('ServiceScreen');
    } else {
      SimpleToast.show(responseJson.errors);
    }
  }

  render() {
    const {
      textStyle,
      containerStyles,
      overlayStyles,
      pickerStyles,
      textInputStyle,
      buttonStyle,
      headerStyle,
    } = styles;
    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={headerStyle}>Customer Details</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Company Name:</Text>
          <View style={{paddingLeft: 20}}>
            <Dropdown
              label={'Company Name'}
              data={this.state.company_name}
              onChangeText={value => {
                this.onSelect(value);
              }}
              fontSize={16}
              labelFontSize={16}
              baseColor={'#fff'}
              textColor={'#fff'}
              itemColor={'#fff'}
              selectedItemColor={'#FFFF00'}
              dropdownPosition={1}
              containerStyle={containerStyles}
              overlayStyle={overlayStyles}
              pickerStyle={pickerStyles}
            />
          </View>
          <View style={{paddingTop: 20, paddingLeft: 20}}>
            <Icon
              name={'add'}
              type={'material'}
              color={'#fff'}
              onPress={() => {
                console.log('add comp button pressed');
                this.setState({dialogCompanyVisible: true});
                sharedPreferences.path = '/customer/addCompany';
              }}
            />
            <AddCompanyDetails {...this.state} update={this.update} />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 20,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>ContactPerson:</Text>
          <View style={{paddingLeft: 20}}>
            <Dropdown
              label={'ContactPerson Detail'}
              data={this.state.contact_person_name_list}
              onChangeText={value => {
                this.onSelectContactPerson(value);
              }}
              fontSize={16}
              labelFontSize={16}
              baseColor={'#fff'}
              textColor={'#fff'}
              itemColor={'#fff'}
              selectedItemColor={'#FFFF00'}
              dropdownPosition={1}
              containerStyle={containerStyles}
              overlayStyle={overlayStyles}
              pickerStyle={pickerStyles}
            />
          </View>
          <View style={{paddingTop: 20, paddingLeft: 20}}>
            <Icon
              name={'add'}
              type={'material'}
              color={'#fff'}
              onPress={() => {
                console.log('add contact button pressed');
                this.setState({dialogContactVisible: true});
                sharedPreferences.path = '/customer/addContactPersonDetails';
              }}
            />
            <AddContactPersonDetails
              {...this.state}
              updateVisibility={this.updateVisibility}
            />
          </View>
        </View>

        <TextInput
          style={textInputStyle}
          placeholder={'add contact person details'}
          placeholderTextColor={'white'}
          value={this.state.contact_person_email}
          onChangeText={val => {
            SimpleToast.show('add contact person details');
          }}
        />
        <TextInput
          style={textInputStyle}
          placeholder={'add contact person details'}
          placeholderTextColor={'white'}
          value={this.state.contact_person_mobile}
          onChangeText={val => {
            SimpleToast.show('add contact person details');
          }}
        />

        <View style={{paddingTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              new CustomerDetailsService().saveCustomerDetail(
                sharedPreferences.email_id,
                sharedPreferences.company_id,
                this.state.contact_person_name,
                this.state.contact_person_email,
                this.state.contact_person_mobile,
                '/customer/saveContactPersonDetails',
                this.saveCustomerDetailCallBack.bind(this),
              );
            }}>
            <View style={buttonStyle}>
              <Text style={{alignContent: 'center'}}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyles: {
    width: 160,
  },
  overlayStyles: {
    backgroundColor: '#000',
    flex: 1,
  },
  pickerStyles: {
    height: 200,
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
  textInputStyle: {
    height: 50,
    width: 250,
    marginTop: 40,
    marginLeft: 20,
    padding: 7,
    fontSize: 15,
    borderWidth: 1,
    color: 'white',
    borderColor: '#fff',
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
export default CustomerDetails;
