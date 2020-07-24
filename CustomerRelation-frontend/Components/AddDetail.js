import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import sharedPreferences from '../SharedPreferences';
import MachineDetailsService from '../Service/MachineDetailsService';
import SimpleToast from 'react-native-simple-toast';

class AddDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      value: '',
    };
  }

  addMachineDetailCallBack(response) {
    if (response.status === 'success') {
      SimpleToast.show(response.message);
      this.props.update(false);
      this.setState({value: ''});
    } else {
      SimpleToast.show(response.errors);
      this.setState({value: ''});
    }
    return sharedPreferences.update;
  }
  render() {
    const {buttonStyle, textInputStyle} = styles;
    console.log('state of dialog', this.state.dialogVisible);
    return (
      <Dialog
        visible={this.props.dialogVisible}
        dialogStyle={{
          backgroundColor: 'black',
          borderColor: 'white',
          borderWidth: 1,
        }}
        onTouchOutside={() => this.props.update(false)}>
        <TextInput
          style={textInputStyle}
          placeholder={'enter the detail'}
          placeholderTextColor={'white'}
          value={this.state.value}
          onChangeText={val => {
            this.setState({value: val});
          }}
        />
        <View style={{paddingTop: 30}}>
          <TouchableOpacity
            onPress={() => {
              new MachineDetailsService().addMachineDetail(
                this.state.value,
                sharedPreferences.path,
                this.addMachineDetailCallBack.bind(this),
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
  textInputStyle: {
    height: 50,
    width: 250,
    marginTop: 20,
    padding: 4,
    fontSize: 15,
    borderWidth: 1,
    color: 'white',
    borderColor: '#fff',
  },
};
export default AddDetail;
