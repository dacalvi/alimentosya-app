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
    TextInput
} from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYPresentacion from '../components/AYPresentacion';
import { MAPS_KEY } from '../common/config';
class OlvideContrasenaCliente extends React.Component {

  constructor(props){
    super(props);
  }
  
  state = {
    nombre: null,
    dni: null,
    telefono: null,
    direccion: null,
    email: null,
    contrasena: null,
    errorMessage: null
    };

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

  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <AYTitleIcon text="Olvide mi contraseña" imageIcon={require('../assets/images/icono_patita.png')} />
            </View>


            <View style={{
              flex:1, 
              flexDirection: 'row', 
              marginLeft: 10, 
              marginBottom: 120,
              marginTop: 50
              }}>
              <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                  <TextInput
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

            

            <Image 
              source={ require('../assets/images/wawis.png') } 
              style={{ width: imageWidth, marginTop: 0, marginBottom: 10 }} />

            <TouchableHighlight 
                onPress={()=>{this.props.navigation.navigate("Horarios")}}
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
                <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Enviar</Text>
            </TouchableHighlight>

            
          <View style={{ height: 50 }} />
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OlvideContrasenaCliente);

const dimensions = Dimensions.get('window');


const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;