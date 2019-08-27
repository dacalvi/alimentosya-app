import React from 'react';
import { Image, View, TouchableHighlight } from 'react-native'
class LogoTitle extends React.Component {
    render() {
      return (
      
        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Marcas');}} style={{ 
          height: '100%', 
          width: '100%', 
          flex: 1,
          justifyContent: 'center', 
          flexDirection: 'row',
          padding: 15 }}>
            <Image
              source={require('../assets/images/iso.png')}
              style={{ flex: 1,
                resizeMode : 'contain',
                width: 90,
                height: undefined }}
            />
        
          </TouchableHighlight>
      );
    }
  }
export default LogoTitle;