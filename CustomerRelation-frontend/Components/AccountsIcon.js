import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

class AccountsIcon extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row', marginRight: 30}}>
        <Icon
          color={'#FFFF00'}
          size={30}
          name={'account-circle'}
          type={'material'}
          onPress={() => {
            this.props.navigation.navigate('RegScreen');
          }}
        />
      </View>
    );
  }
}

export default AccountsIcon;
