import React from 'react';
import LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYRedCircle from '../components/AYRedCircle';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableHighlight,
    TextInput,
    Alert,
    Platform
} from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYPresentacion from '../components/AYPresentacion';
import { MAPS_KEY } from '../common/config';



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
    mapVisible: false
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
                Geocoder.init(MAPS_KEY);
                Geocoder.from(this.state.calle + ' ' + this.state.numero + ', Mar del Plata; Argentina')
                .then(json => {
                    var location = json.results[0].geometry.location;
                    this.setState({ latitude: location.lat, longitude: location.lng });
                    if(this.distance(location.lat, location.lng, -38.00963,-57.40543) < 17059.05){
                        console.log("showing map");
                        this.setState({mapVisible: true});
                        Alert.alert("Genial!", "Estas en la zona de envio");
                        this.setState({continuarVisible: true});
                    }else{
                        Alert.alert("Zona no disponible", "No estas en la zona de envio");
                    }
    
                })
                .catch((error)=> {
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

      <View style={{flex: 1}}>
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
            
            

                <TouchableHighlight 
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
                </TouchableHighlight>

            
          <View style={{ height: 150 }} />
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
      </View>   	
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