import Constants from "expo-constants";
import React from 'react';
import { Alert, ScrollView, Text, TextInput, KeyboardAvoidingView, StatusBar, TouchableHighlight, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYChatButton from '../components/AYChatButton';
import AYRedCircle from '../components/AYRedCircle';
import LogoTitle from '../components/LogoTitle';
import styles from '../constants/Styles';
import { Spinner } from 'native-base';

class DatosEnvio extends React.Component {

  constructor(props){
    super(props); 
  }
  
  state = {
    location: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    observaciones: '',
    ciudad: '',
    errorMessage: '',
    latitude: -34.6036991,
    longitude: -58.383566,
    address: '',
    mapVisible: false,
    deliveryEligible: false,
    geolocationg: false
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


    _attemptGeocode = () => {
        console.log("_attemptGeocode");
        if(this.state.calle === null  || this.state.numero === null || this.state.calle === ''  || this.state.numero === ''){ 
            console.log("hidding map");
            this.setState({mapVisible: false});
            return false;
        }else{
            try {
                this.setState({geolocationg:true});
                Geocoder.init(Constants.manifest.extra.MAPS_KEY);
                Geocoder.from(this.state.calle + ' ' + this.state.numero + ', Mar del Plata; Argentina')
                .then(json => {
                    this.setState({geolocationg:false});
                    var location = json.results[0].geometry.location;
                    this.setState({ latitude: location.lat, longitude: location.lng });
                    if(this.distance(location.lat, location.lng, -38.00963,-57.40543) < 17059.05){
                        console.log("showing map");
                        this.setState({mapVisible: true, deliveryEligible: true});
                        Alert.alert("Genial!", "Estas en la zona de envio");
                        this.setState({continuarVisible: true});
                    }else{
                        Alert.alert("Zona no disponible", "No estas en la zona de envio");
                    }
    
                })
                .catch((error)=> {
                    this.setState({geolocationg:false});
                    if(error.code == 4){
                        Alert.alert("Donde?", "No se encontaron resultados para esa ubicación");
                    }else{
                        error => console.warn(error)
                    }
                });
            } catch (error) {
                console.log(error);
                alert(error.name);
            }
        }
        
        
        
    }

    

    saveShipmentData(){
        if(this.state.calle !== '' && this.state.numero !== ''){
            const { calle, numero, departamento, piso, latitude, longitude, observaciones } = this.state;
            this.props.addShippingInfo({calle, numero, departamento, piso, latitude, longitude, observaciones});
            this.props.navigation.navigate("Horarios");
        }else{
            Alert.alert("Datos inválidos", "Ingrese calle y número");
        }
    }

    

    componentDidMount(){
        Alert.alert("Aviso", "El servicio se encuentra habilitado para la ciudad de Mar del Plata, Argentina por el momento. Ingrese su direccion para verificar disponibilidad de entrega");
    }

    distance(lat1,lon1,lat2,lon2) {
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2-lat1) * Math.PI / 180;
        var dLon = (lon2-lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        
        return d*1000;
    }


  render() {
    const { mapVisible } = this.state;  
    return (
        <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior="height" 
            keyboardVerticalOffset={-StatusBar.currentHeight}
            enabled> 
      
        <ScrollView style={styles.container}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <AYTitleIcon text="Envío" imageIcon={require('../assets/images/icono_patita.png')} />
                <View style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    alignContent: 'flex-end',
                    width:150,
                    maxWidth: 160,
                    marginTop: 10
                    }}>
                    <AYRedCircle text={1} color='#FF0000'/>
                    <AYRedCircle text={2}/>
                    <AYRedCircle text={3}/>
                </View>
            </View>

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginBottom: 20}}>
                    <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                        <TextInput
                            placeholder="Calle"    
                            style={{
                                width: '90%',
                                fontSize: 18,
                                borderBottomWidth: 1,
                                marginHorizontal: undefined
                            }}
                            value={this.state.calle}
                            onChangeText={ calle => {
                                this.setState({calle});
                            }}
                            onBlur={()=>{
                                this._attemptGeocode();
                            }}
                            />
                        <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                        <TextInput
                            placeholder="Número"    
                            style={{
                                width: '90%',
                                fontSize: 18,
                                borderBottomWidth: 1,
                                marginHorizontal: undefined
                            }}
                            value={this.state.numero}
                            onChangeText={ numero => {
                                this.setState({numero});
                            }}
                            onBlur={()=>{
                                this._attemptGeocode();
                            }}
                            />
                        <Text style={{color: 'red', marginLeft: -5,marginTop:7}}>*</Text>
                    </View>
            </View>

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginBottom: 20}}>
                    <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                        <TextInput
                            placeholder="Depto"    
                            style={{
                                width: '90%',
                                fontSize: 18,
                                borderBottomWidth: 1,
                                marginHorizontal: undefined
                            }}
                            value={this.state.departamento}
                            onChangeText={ departamento => {
                                this.setState({departamento});
                            }}
                            />
                        
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                        <TextInput
                            placeholder="Piso"    
                            style={{
                                width: '90%',
                                fontSize: 18,
                                borderBottomWidth: 1,
                                marginHorizontal: undefined
                            }}
                            value={this.state.piso}
                            onChangeText={ piso => {
                                this.setState({piso});
                            }}
                            
                            />
                        
                    </View>
            </View>

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10}}>
                    <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                        <TextInput
                            placeholder="Observaciones"
                            textAlignVertical={'top'}
                            multiline={true}
                            height={100}
                            value={this.state.observaciones}
                            onChangeText={ observaciones => {
                                this.setState({observaciones});
                            }}
                            style={{
                                width: '95%',
                                fontSize: 18,
                                borderBottomWidth: 1,
                                marginHorizontal: undefined
                            }} />
                        
                    </View>
                    
            </View>
            {this.state.geolocationg? <Spinner color='red' />:undefined}                        
            {mapVisible? 
                <MapView
                    style={{ alignSelf: 'stretch', height: 200 }}
                    provider = {'google'}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                }}>
                <MapView.Marker
                    coordinate={{latitude: this.state.latitude,
                    longitude: this.state.longitude}}
                    title={this.state.address}
                    image={require('../assets/images/marker.png')}
                    style={{width: 100}}
                    
                    description={"Ubicacion de la direccion indicada"}
                />
                </MapView>
            : undefined }
            
                        {this.state.deliveryEligible? <TouchableHighlight
                    
                    onPress={()=>{ this.saveShipmentData();}}
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
                    <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Continuar</Text>
                </TouchableHighlight>:<View
                    style={{    
                        backgroundColor: '#DDDDDD', 
                        borderRadius: 10,
                        padding: 5,
                        height: 40,
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginHorizontal: 20,
                        marginVertical: 10
                        }}> 
                    <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Continuar</Text>
                </View>}

                

            
          
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
      </KeyboardAvoidingView>   	
    );
  }
}

function mapStateToProps(state){
  return { 
    shippingInfo: state.cart.shippingInfo
  } 
}

function mapDispatchToProps(dispatch){
    return {
        addShippingInfo: (info) => dispatch({type: 'ADD_SHIPPING_INFO', payload: info}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatosEnvio);