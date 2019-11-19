import Constants from "expo-constants";
import * as Facebook from 'expo-facebook';
import React from 'react';
import { Alert, Dimensions, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Colors, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYFacebookLoginButton from '../components/AYFacebookLoginButton';
import AYTitleIcon from '../components/AYTitleIcon';
import LogoTitle from '../components/LogoTitle';

class LoginCliente extends React.Component { 

  async logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync( Constants.manifest.extra.FB_APP_ID, {
        permissions: ["email", "public_profile"],
      });

      if (type === 'success') {
        

        console.log("TOKEEEEEN DEL LADO JS", token);


        let api = new RestApi();
        api.loginWithFacebookToken(token)
        .then((response)=>{
          if(typeof response.redirect !== 'undefined' && response.redirect !== ''){
            this.props.navigation.navigate(response.redirect);  
          }else{
            this.props.navigation.navigate('Carrito');
          }
        })
        .catch((err)=>{
          console.log("ERROR?",err);
          if(err && err.error){
            if(err.error == "Pending"){
              alert("Su cuenta se encuentra en proceso de revision, recibira un email con el resultado del proceso muy pronto");
            }else if(err.error == "Unauthorized"){
              Alert.alert('Usuario o contrasena incorrectas');
              this.state.password = '';
              this.inputPassword.focus();
            }else{
              alert(err.error);
            }
          }
        });
        

        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        
        console.log(await response.json());
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) 
    {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  btnIngresarClick(){
    let api = new RestApi();
    api.login({
      "username": this.state.username,
      "password": this.state.password
    })
    .then((response)=>{
      this.props.navigation.navigate('Carrito');
    })
    .catch((err)=>{
      console.log("ERROR?"+err);
      if(err && err.error){
        if(err.error == "Pending"){
          alert("Su cuenta se encuentra en proceso de revision, recibira un email con el resultado del proceso muy pronto");
        }else if(err.error == "Unauthorized"){
          Alert.alert('Usuario o contrasena incorrectas');
          this.state.password = '';
          this.inputPassword.focus();
        }else{
          alert(err.error);
        }
      }
    });
  }
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerRight: <Text />,
    headerLeft: <Text />,

    headerTintColor: '#FF0000',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    username: '',
    password: ''
  };

  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior="position" 
        keyboardVerticalOffset={-StatusBar.currentHeight}
        enabled>                  
        <AYTitleIcon text="Ingresar a mi cuenta" imageIcon={require('../assets/images/icono_patita.png')} />
        
        
        
        <AYFacebookLoginButton onPress={()=>{ this.logIn(); }} />
			      <TextInput
              textContentType='emailAddress'
              label='Email'
              mode='flat'
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              style={{backgroundColor: Colors.white, marginHorizontal: 20,  marginBottom: 20}}
            />

            <TextInput
              textContentType='password'
              label='Contraseña'
              mode='flat'
              ref={ref => (this.inputPassword = ref)}
              ref={ref => (this.inputPassword = ref)}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              value={this.state.password}
              style={{backgroundColor: Colors.white, marginHorizontal: 20, marginBottom: 20 }}
            />

            <Image 
              source={ require('../assets/images/wawis.png') } 
              style={{ width: imageWidth, marginTop: 0, marginBottom: 10 }} />


            <View style={styles.welcomeContainer}>
            
              <TouchableHighlight 
              onPress={()=> {this.btnIngresarClick()} }
              style={{    
                  backgroundColor: '#FF0000', 
                  borderRadius: 20,
                  width: '90%',
                  height: 60,
                  justifyContent: 'center',
                  alignContent: 'center'
                }}> 
                  <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Ingresar</Text>
              </TouchableHighlight>
              
              <View style={{
                padding: 20,
                width: '100%', 
                flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-between' 
                }}>
                <View>
                    <Text onPress={()=>{ this.props.navigation.navigate("OlvideContrasenaCliente")}} style={{color: '#777777'}}>Olvidé mi contraseña</Text>
                </View>
                <View>
                  <Text onPress={()=>{ this.props.navigation.navigate("RegistroCliente")}} style={{color: '#777777'}}>Registrate!</Text>  
                </View>  
              </View>
              
            </View>

        	<View style={{ height: 50 }} />
  
      </KeyboardAvoidingView>
      
    );
  }
}


function mapStateToProps(state){
  return {} 
}

function mapDispatchToProps(dispatch){
  return {
    login : (token) => dispatch({type: 'LOGIN', payload: token})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginCliente);


const dimensions = Dimensions.get('window');


const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
  
const styles = StyleSheet.create({
  botonAevra: {
    color: 'white',
    backgroundColor: '#FF0000', 
    borderRadius: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  }
  
});