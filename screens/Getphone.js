import React from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYTitleIcon from '../components/AYTitleIcon';
import LogoTitle from '../components/LogoTitle';
import layout from '../constants/Layout';
import styles from '../constants/Styles';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;
import RestApi from '../common/RestApi';

export default class Getphone extends React.Component {

  constructor(props){
    super(props);
        this.state = {
            telefono : '',
            telefonoError: ''
        }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerRight: <AYCarritoIcono navigation={navigation}/>,
      headerLeft: <Text></Text>,
      headerTintColor: '#FF0000',
      headerTitleStyle: {flex: 1, textAlign: 'center'}
    }
  }


  btnAgregarTelefonoClick(){
    let api = new RestApi();
    api.agregarTelefono({'telefono': this.state.telefono})
    .then((response)=>{
        this.props.navigation.navigate('Carrito');
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
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <AYTitleIcon text="Ingrese su teléfono" imageIcon={require('../assets/images/icono_patita.png')} />
            </View>

            <Text style={{paddingHorizontal:15}}> Para ofrecerle un mejor servicio agregue un telefono de contacto que sera usado para contactarlo 
            en caso de no encontrarlo en el punto de entrega.</Text>




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

            {this.state.telefono !== ''? <TouchableHighlight 
                onPress={()=>{
                  this.btnAgregarTelefonoClick();
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
                <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Agregar Teléfono</Text>
            </TouchableHighlight>: undefined}
              




        </ScrollView>
      </View>   	
    );
  }
}
