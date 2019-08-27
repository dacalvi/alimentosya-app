import React from 'react';
import LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYCarritoIcono from '../components/AYCarritoIcono';
import { Image, View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';

class Gracias extends React.Component {

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

  componentWillMount(){
    console.log(this.props);
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <AYTitleIcon text="Pago" imageIcon={require('../assets/images/icono_patita.png')} />
            
            <Text style={{
                fontSize: 70,
                color: 'red',
                textAlign: 'center'
            }}>Muchas Gracias!</Text>
            <Text style={{
                fontSize: 28,
                textAlign: 'center',
                marginHorizontal:50
            }}>
                Tu pedido sera enviado a {this.props.cart.shippingInfo.calle} {this.props.cart.shippingInfo.numero} el/los días solicitados 
            </Text>
          
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Image style={{ flex:1, width: null, height: 170 }} resizeMode='cover' source={require('../assets/images/wawis.png')} />
            </View>

            <TouchableHighlight 
                onPress={()=>{ this.props.navigation.navigate("Marcas")}}
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
                    <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Volver</Text>
            </TouchableHighlight>

          <View style={{ height: 150 }} />
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
      </View>   	
    );
  }
}

function mapStateToProps(state){
  return { cart: state.cart } 
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gracias);