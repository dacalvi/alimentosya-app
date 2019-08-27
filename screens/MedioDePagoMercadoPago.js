import React from 'react';
import LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYRedCircle from '../components/AYRedCircle';
import { Image, View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';

class MedioDePagoMercadoPago extends React.Component {

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


  render() {
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
                    <AYRedCircle text={3}/>
                </View>
            </View>


            <Image style={{width: undefined, height: 150}} source={require('../assets/images/mercadopago.png')}/>

            <View style={{ 
              backgroundColor: '#FAFAFA',
              marginHorizontal: 20,
              flex:1,
              justifyContent: 'center',
              borderRadius: 10,
              padding: 5
              }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>Total: $1000</Text>
            </View>
            <TouchableHighlight 
                onPress={()=>{}}
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
                    <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Pagar</Text>
            </TouchableHighlight>

          <View style={{ height: 150 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MedioDePagoMercadoPago);