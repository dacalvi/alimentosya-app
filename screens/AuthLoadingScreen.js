import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');
    
    if(token){
      console.log("TOKEN: " + token);
      this.props.navigation.navigate('ClienteApp');
    }else{
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}