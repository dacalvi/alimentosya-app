import React from 'react';
import LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYRedCircle from '../components/AYRedCircle';
import { 
  Image, 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  StyleSheet, 
  TouchableHighlight,
  Alert,
  Linking
} from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import * as WebBrowser from 'expo-web-browser';

class SeleccionarMedioPago extends React.Component {

  constructor(props){
    super(props);
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


  pagodirecto(){
    let api = new RestApi();
      api.pagodirecto({
        ...this.props.cart
      })
      .then((response)=>{
        this.props.clearCart();
        this.props.navigation.navigate('Gracias');
      })
      .catch((err)=>{
        console.log("ERROR?"+err);
        Alert.alert('Consulta', err);
      });
      this.props.navigation.navigate("Gracias");
  }

  pagoMercadoPago(){
    let api = new RestApi();
      api.pagomercadopago({
        ...this.props.cart
      })
      .then((responseJson)=>{
        WebBrowser.openBrowserAsync(responseJson.payment_link);
        //Linking.openURL(responseJson.payment_link);
        //Alert.alert("Aviso", "Sera redirigido al sitio de Mercado Pago para realizar el pago alli");
        this.props.navigation.navigate('Gracias');
      })
      .catch((err)=>{
        console.log("ERROR?"+err);
        Alert.alert('Consulta', response.error);
      });
  }


  componentWillMount(){
    console.log(this.props);
    let total = 0;
    this.props.cart.cart.forEach(item => {
      total = total + ( item.cantidad * parseInt(item.price));
    });
    this.setState({total});
  }

  render() {
    const { total } = this.state;
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <AYTitleIcon text="Pago" imageIcon={require('../assets/images/icono_patita.png')} />
                <View style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    alignContent: 'flex-end',
                    width:150,
                    maxWidth: 160,
                    marginTop: 10
                    }}>
                    <AYRedCircle text={1}/>
                    <AYRedCircle text={2}/>
                    <AYRedCircle text={3}  color='#FF0000'/>
                </View>
            </View>

            <View style={{ 
                marginTop: 20,
                backgroundColor: 'lightgray',
                padding: 20,
                marginHorizontal: 20,
                borderRadius:10,
                alignContent: 'center',
                alignItems: 'center'
                }}>
                    <Text style={{textAlign: 'center'}}>Pago en efectivo</Text>
                    <Text style={{ 
                        fontSize: 32, 
                        fontWeight: 'bold', 
                        textAlign: 'center'}}>Total: ${total}</Text>
                    <TouchableHighlight 
                        onPress={()=>{this.pagodirecto();}}
                        style={{    
                            backgroundColor: '#FF0000', 
                            borderRadius: 10,
                            padding: 5,
                            height: 40,
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            paddingHorizontal: 20
                            }}> 
                            <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Pago al recibir el pedido</Text>
                    </TouchableHighlight>
            </View>

            <View style={{ 
                marginTop: 20,
                backgroundColor: 'lightgray',
                padding: 20,
                marginHorizontal: 20,
                borderRadius:10,
                alignContent: 'center',
                alignItems: 'center'
                }}>
                    <Text style={{textAlign: 'center'}}>Pago Mercado Pago +5% de recargo</Text>
                    <Text style={{ 
                        fontSize: 32, 
                        fontWeight: 'bold', 
                        textAlign: 'center'}}>Total: ${parseFloat(Math.round((total * 1.05) * 100) / 100).toFixed(2)}</Text>
                    <Image style={{width: 200, height: 75}} source={require('../assets/images/mercadopago.png')}/>
                    <TouchableHighlight 
                        onPress={()=>{this.pagoMercadoPago();}}
                        style={{    
                            backgroundColor: '#FF0000', 
                            borderRadius: 10,
                            padding: 5,
                            height: 40,
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginHorizontal: 20,
                            paddingHorizontal: 20
                            }}> 
                            <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Pagar</Text>
                    </TouchableHighlight>
            </View>

          <View style={{ height: 150 }} />
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
      </View>   	
    );
  }
}

function mapStateToProps(state){
  return {
    cart : state.cart
  } 
}

function mapDispatchToProps(dispatch){
    return {
      clearCart: () => dispatch({type: 'CLEAR_CART', payload: null})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeleccionarMedioPago);