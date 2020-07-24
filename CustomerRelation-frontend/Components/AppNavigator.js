import React from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import Register from './Register';
import Login from './Login';
import CustomerDetails from './CustomerDetails';
import MachineDetails from './MachineDetails';
import ServiceDetails from './ServiceDetails';
import {Icon} from 'react-native-elements';
import AddDetail from './AddDetail';
import SendEmail from './SendEmail';

class AppNavigatorConstants {
  static CUSTOMER_DETAILS_URL: 'CustomerScreen';
}

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerRight: (
        <View style={{flexDirection: 'row', marginRight: 30}}>
          <Icon
            color={'#fff'}
            size={30}
            name={'account-circle'}
            type={'material'}
            onPress={() => {
              navigation.navigate('RegScreen');
            }}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: 'black',
      },
    };
  };
  render() {
    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <MachineDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  // AccountsScreen: {
  //   screen: AccountsIcon,
  // },
  RegScreen: {
    screen: Register,
    navigationOptions: {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerStyle: {
        backgroundColor: 'black',
      },
    },
  },
  LogScreen: {
    screen: Login,
    navigationOptions: {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerStyle: {
        backgroundColor: 'black',
      },
    },
  },
  CustomerScreen: {
    screen: CustomerDetails,
    navigationOptions: {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerStyle: {
        backgroundColor: 'black',
      },
    },
  },
  MachinesScreen: {
    screen: MachineDetails,
    navigationOptions: {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerStyle: {
        backgroundColor: 'black',
      },
    },
  },
  ServiceScreen: {
    screen: ServiceDetails,
    navigationOptions: {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerStyle: {
        backgroundColor: 'black',
      },
    },
  },
  AddDetailScreen: {
    screen: AddDetail,
    navigationOptions: {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerStyle: {
        backgroundColor: 'black',
      },
    },
  },
  EmailScreen: {
    screen: SendEmail,
    navigationOptions: {
      headerLeft: <HeaderBackButton tintColor={'white'} />,
      headerStyle: {
        backgroundColor: 'black',
      },
    },
  },
  initialRouteName: Home,
});

export default createAppContainer(AppNavigator);
export {AppNavigatorConstants};
