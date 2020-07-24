import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import MachineDetailsService from '../Service/MachineDetailsService';
import {Icon} from 'react-native-elements';
import AddDetail from './AddDetail';
import sharedPreferences from '../SharedPreferences';
import SimpleToast from 'react-native-simple-toast';

class MachineDetails extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      dialogVisible: false,
      type: [],
      make: [],
      name: [],
      rating: [],
      type_data: '',
      value_data: '',
      make_data: '',
      rating_data: '',
    };
  }

  componentDidMount() {
    console.log('component did mount!!');
    this.onChangeText();
  }
  onChangeText() {
    let machineDetailsService = new MachineDetailsService();
    machineDetailsService.machineTypeList(this.setMachineType.bind(this));
  }
  setMachineType(values) {
    let count = Object.keys(values.machine_type).length;
    let val = values.machine_type;
    let type = [];
    for (let i = 0; i < count; i++) {
      console.log('saf', val[i].machine_type);
      type.push({value: val[i].machine_type});
    }
    this.setState({type: type});
    // type_data = type;
    console.log('this is type', this.state.type);
    this.setMachineMake(values);
    this.setMachineName(values);
    this.setMachineRating(values);
  }
  setMachineName(values) {
    let count = Object.keys(values.machine_name).length;
    let val = values.machine_name;
    let name = [];
    for (let i = 0; i < count; i++) {
      console.log('saf', val[i].machine_name);
      name.push({value: val[i].machine_name});
    }
    this.setState({name: name});
    // type_data = type;
    console.log('this is name', this.state.name);
  }

  setMachineMake(values) {
    let count = Object.keys(values.machine_make).length;
    let val = values.machine_make;
    let make = [];
    for (let i = 0; i < count; i++) {
      console.log('saf', val[i].machine_make);
      make.push({value: val[i].machine_make});
    }
    this.setState({make: make});
    // type_data = type;
    console.log('this is make', this.state.make);
  }
  setMachineRating(values) {
    let count = Object.keys(values.machine_rating).length;
    let val = values.machine_rating;
    let rating = [];
    for (let i = 0; i < count; i++) {
      console.log('saf', val[i].machine_rating);
      rating.push({value: val[i].machine_rating});
    }
    this.setState({rating: rating});
    // type_data = type;
    console.log('this is rating', this.state.rating);
  }

  update = dialogVisible => {
    this.setState({dialogVisible: dialogVisible});
    this.onChangeText();
  };

  saveMachineDetailCallBack(response) {
    const {navigate} = this.props.navigation;
    if (response.status === 'success') {
      SimpleToast.show(response.message);
      console.log('navigating...');
      return navigate('CustomerScreen');
    } else {
      SimpleToast.show(response.errors);
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    const {
      containerStyles,
      overlayStyles,
      pickerStyles,
      textStyle,
      buttonStyle,
      headerStyle,
    } = styles;
    return (
      <View>
        <View style={{justifyContent: 'center'}}>
          <Text style={headerStyle}>Machine Details</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Machine Type:</Text>
          <View style={{paddingLeft: 20}}>
            <Dropdown
              label={'Machine Type'}
              data={this.state.type}
              onChangeText={value => {
                this.setState({type_data: value});
              }}
              fontSize={16}
              labelFontSize={16}
              baseColor={'#fff'}
              textColor={'#fff'}
              itemColor={'#fff'}
              selectedItemColor={'#FFFF00'}
              dropdownPosition={-5}
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
                console.log('add button pressed');
                this.setState({dialogVisible: true});
                sharedPreferences.path = '/machine/add_machine_type';
              }}
            />
            <AddDetail {...this.state} update={this.update} />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Machine Name:</Text>
          <View style={{paddingLeft: 20}}>
            <Dropdown
              label={'Machine Name'}
              data={this.state.name}
              onChangeText={value => {
                this.setState({name_data: value});
              }}
              fontSize={16}
              labelFontSize={16}
              baseColor={'#fff'}
              textColor={'#fff'}
              itemColor={'#fff'}
              selectedItemColor={'#FFFF00'}
              dropdownPosition={-5}
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
                console.log('add button pressed');
                this.setState({dialogVisible: true});
                sharedPreferences.path = '/machine/add_machine_name';
              }}
            />
            <AddDetail {...this.state} update={this.update} />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Machine Make:</Text>
          <View style={{paddingLeft: 20}}>
            <Dropdown
              label={'Machine Make'}
              data={this.state.make}
              onChangeText={value => {
                this.setState({make_data: value});
              }}
              fontSize={16}
              labelFontSize={16}
              baseColor={'#fff'}
              textColor={'#fff'}
              itemColor={'#fff'}
              selectedItemColor={'#FFFF00'}
              dropdownPosition={-5}
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
                console.log('add button pressed');
                this.setState({dialogVisible: true});
                sharedPreferences.path = '/machine/add_machine_make';
              }}
            />
            <AddDetail {...this.state} update={this.update} />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Text style={textStyle}>Machine Rating:</Text>
          <View style={{paddingLeft: 20}}>
            <Dropdown
              label={'Machine Rating'}
              data={this.state.rating}
              onChangeText={value => {
                this.setState({rating_data: value});
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
                console.log('add button pressed');
                this.setState({dialogVisible: true});
                sharedPreferences.path = '/machine/add_machine_rating';
              }}
            />
            <AddDetail {...this.state} update={this.update} />
          </View>
        </View>

        <View style={{paddingTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              new MachineDetailsService().saveMachineDetail(
                this.state.type_data,
                this.state.name_data,
                this.state.make_data,
                this.state.rating_data,
                this.saveMachineDetailCallBack.bind(this),
              );
              // return navigate('CustomerScreen');
            }}>
            <View style={buttonStyle}>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
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
export default MachineDetails;
