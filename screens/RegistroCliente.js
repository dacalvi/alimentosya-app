import React from 'react';
import LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYRedCircle from '../components/AYRedCircle';
import { 
    Constants, 
    MapView, 
    Permissions, 
    Location 
} from 'expo';
import Geocoder from 'react-native-geocoding';
import {
    Dimensions,
    Image, 
    View, 
    Text, 
    ScrollView, 
    KeyboardAvoidingView, 
    StyleSheet, 
    TouchableHighlight,
    Platform,
    TextInput,
    Alert
} from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYPresentacion from '../components/AYPresentacion';
import { MAPS_KEY } from '../common/config';
import validate from '../constants/validate_wrapper';
import { Snackbar  } from 'react-native-material-ui';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class RegistroCliente extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nombre : '',
      dni : '',
      telefono : '',
      direccion : '',
      email : '',
      contrasena : '',
      recontrasena : '',
      nombreError: '',
      dniError: '',
      telefonoError: '',
      direccionError: '',
      emailError: '',
      contrasenaError: '',
      recontrasenaError: '',
      isVisible: false,
      errorMsg: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerRight: <AYCarritoIcono navigation={navigation}/>,
      headerTintColor: '#FF0000',
      headerTitleStyle: {flex: 1, textAlign: 'center'}
    }
  }


  btnRegistrarClick(){
    const nombreError = validate('nombre', this.state.nombre);
    const dniError = validate('dni', this.state.dni);
    const telefonoError = validate('telefono', this.state.telefono);
    const emailError = validate('email', this.state.email);
    const direccionError = validate('direccion', this.state.direccion);
    const contrasenaError = validate('password', this.state.contrasena);
    const recontrasenaError = validate('repassword', this.state.recontrasena);


    this.setState({
      nombreError: nombreError,
      dniError: dniError,
      telefonoError: telefonoError,
      emailError: emailError,
      direccionError: direccionError,
      contrasenaError: contrasenaError,
      recontrasenaError: recontrasenaError
    });

    if (
      !nombreError && 
      !dniError && 
      !telefonoError && 
      !emailError && 
      !direccionError && 
      !contrasenaError && 
      !recontrasenaError) {

      let registrationData = {
        "nombre": this.state.nombre,
        "dni": this.state.dni,
        "telefono": this.state.telefono,
        "direccion": this.state.direccion,
        "email": this.state.email,
        "contrasena": this.state.contrasena
      }

      let api = new RestApi();
      api.registerCliente(registrationData)
      .then((result)=>{
        
        Alert.alert("Validacion", "Revisa tu cuenta de email para validar tu registro");
        this.props.navigation.navigate('LoginCliente');
        /*
        api.login({
          "username": this.state.email,
          "password": this.state.contrasena
        })
        .then((response)=>{
          
          this.props.navigation.navigate('Carrito');
          
        })
        .catch((err)=>{
          if(err && err.error){
            if(err.error == "Pending"){
              Alert.alert("Importante", "Su cuenta se encuentra en proceso de revision, recibira un email con el resultado del proceso muy pronto");
            }else if(err.error == "Unauthorized"){
              Alert.alert("Importante", 'Usuario o contrasena incorrectas');
              this.state.contrasena = '';
              this.inputPassword.focus();
            }else{
              Alert.alert("Importante", err.error);
            }
          }
        });
        */



        
      })
      .catch((err)=>{
        console.log(err);

        if(err){
          Alert.alert("Aviso", err.error);
          this.setState({isVisible: true, errorMsg: err.error});
        }
      });
      
    }else{
      this.setState({isVisible: true, errorMsg: 'Validacion Fallida'});
    }

  }


  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <AYTitleIcon text="Registro Cliente" imageIcon={require('../assets/images/icono_patita.png')} />
            </View>

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10}}>
              <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                  <TextInput
                      placeholder="Nombre"    
                      style={{
                          width: '95%',
                          fontSize: 18,
                          borderBottomWidth: 1,
                          marginHorizontal: undefined
                      }}
                      value={this.state.nombre}
                      onChangeText={ nombre => {
                          this.setState({nombre});
                      }}                           
                      />
                  <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
              </View>
            </View>
            {this.state.nombreError !== ''?
              <Text style={{color: 'red', marginLeft:15}}>{this.state.nombreError}</Text>:undefined}
            
            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
              <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                  <TextInput
                      keyboardType={'numeric'}
                      placeholder="DNI"    
                      style={{
                          width: '95%',
                          fontSize: 18,
                          borderBottomWidth: 1,
                          marginHorizontal: undefined
                      }}
                      value={this.state.dni}
                      onChangeText={ dni => {
                          this.setState({dni});
                      }}                           
                      />
                  <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
              </View>
            </View>
            {this.state.dniError !== ''?
              <Text style={{color: 'red', marginLeft:15}}>{this.state.dniError}</Text>:undefined}

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
              <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                  <TextInput
                      keyboardType={'numeric'}
                      placeholder="Teléfono"    
                      style={{
                          width: '95%',
                          fontSize: 18,
                          borderBottomWidth: 1,
                          marginHorizontal: undefined
                      }}
                      value={this.state.telefono}
                      onChangeText={ telefono => {
                          this.setState({telefono});
                      }}                           
                      />
                  <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
              </View>
            </View>
            {this.state.telefonoError !== ''?
              <Text style={{color: 'red', marginLeft:15}}>{this.state.telefonoError}</Text>:undefined}

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
              <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                  <TextInput
                      placeholder="Dirección"    
                      style={{
                          width: '95%',
                          fontSize: 18,
                          borderBottomWidth: 1,
                          marginHorizontal: undefined
                      }}
                      value={this.state.direccion}
                      onChangeText={ direccion => {
                          this.setState({direccion});
                      }}                           
                      />
                  <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
              </View>
            </View>
            {this.state.direccionError !== ''?
              <Text style={{color: 'red', marginLeft:15}}>{this.state.direccionError}</Text>:undefined}

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
              <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                  <TextInput
                      keyboardType={'email-address'}
                      placeholder="Email"    
                      style={{
                          width: '95%',
                          fontSize: 18,
                          borderBottomWidth: 1,
                          marginHorizontal: undefined
                      }}
                      value={this.state.email}
                      onChangeText={ email => {
                          this.setState({email});
                      }}                           
                      />
                  <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
              </View>
            </View>
            {this.state.emailError !== ''?
              <Text style={{color: 'red', marginLeft:15}}>{this.state.emailError}</Text>:undefined}

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Contraseña"    
                        style={{
                            width: '95%',
                            fontSize: 18,
                            borderBottomWidth: 1,
                            marginHorizontal: undefined
                        }}
                        value={this.state.contrasena}
                        onChangeText={ contrasena => {
                            this.setState({contrasena});
                        }}                           
                        />
                    <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
                </View>
            </View>
            {this.state.contrasenaError !== ''?
              <Text style={{color: 'red', marginLeft:15}}>{this.state.contrasenaError}</Text>:undefined}

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Repetir Contraseña"    
                        style={{
                            width: '95%',
                            fontSize: 18,
                            borderBottomWidth: 1,
                            marginHorizontal: undefined
                        }}
                        value={this.state.recontrasena}
                        onChangeText={ recontrasena => {
                            this.setState({recontrasena});
                        }}                           
                        />
                    <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
                </View>
            </View>
            {this.state.recontrasenaError !== ''?
              <Text style={{color: 'red', marginLeft:15}}>{this.state.recontrasenaError}</Text>:undefined}

            

            <Image 
              source={ require('../assets/images/wawis.png') } 
              style={{ width: imageWidth, marginTop: 0, marginBottom: 10 }} />

            <TouchableHighlight 
                onPress={()=>{
                  this.btnRegistrarClick();
                  }}
                style={{    
                    backgroundColor: '#FF0000', 
                    borderRadius: 10,
                    padding: 5,
                    height: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginHorizontal: 20,
                    marginVertical: 10
                    }}> 
                <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Registrar</Text>
            </TouchableHighlight>
            <Snackbar visible={this.state.isVisible} message={this.state.errorMsg} onRequestClose={() => this.setState({ isVisible: false })} />        
            
          
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
          {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>   	
    );
  }
}

function mapStateToProps(state){
  return { } 
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistroCliente);

const dimensions = Dimensions.get('window');


const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;