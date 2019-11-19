import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { onSignOut } from '../common/auth';
import AYDrawerOpen from '../components/AYDrawerOpen';

class LogoTitle extends React.Component {
    render() {
      return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="#ffffff00"
          onPress={()=>{this.props.navigation.navigate('Marcas');}} 
          style={styles.titleLogo}>
            <Image
              source={require('../assets/images/iso.png')}
              style={styles.imageLogo}
            />
        </TouchableHighlight>
        <AYDrawerOpen navigation={this.props.navigation} />
      </View>
      );
    }

    

    logout(){
      this.props.logout();
      onSignOut();
      this.props.navigation.navigate("Marcas");
    }

  }

function mapStateToProps(state){
    return { cart: state.cart } 
}
  
function mapDispatchToProps(dispatch){
  return {
      logout: () => dispatch({type: 'LOGOUT', payload: null})
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LogoTitle);
  

var styles = StyleSheet.create({
  container: {
    flex:1, 
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'center',
    
  },
  titleLogo: {
    
  },
  imageLogo: {
    flex: 1,
    resizeMode : 'contain',
    height: undefined
  }
});