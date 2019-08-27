import React from 'react';
import  LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProductoCarrito from '../components/AYProductoCarrito';
import AYChatButton from '../components/AYChatButton';
import AYTituloMarca from '../components/AYTituloMarca';
import AYCarritoIcono from '../components/AYCarritoIcono';

import { Button } from 'react-native-material-ui';
import { Image, View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import FullWidthImage from 'react-native-fullwidth-image';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';


const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;


class Carrito extends React.Component {



  constructor(props){
    super(props);
    this.state = {
      cart: [],
      total: 0
    };
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerRight: <Text></Text>,
      
      headerTintColor: '#FF0000',
      headerTitleStyle: {flex: 1, textAlign: 'center'}
    }
  }

  

  componentWillMount(){


    isSignedIn()
    .then(()=>{ 
      
      if(typeof this.props.cart != 'undefined'){
        this.setState({cart: this.props.cart}, ()=>{this.updateTotal()});
      }
      
    })
    .catch(()=>{ 
      this.props.navigation.navigate('LoginCliente') 
    });


  }

  onDeleteItem(){
    if(typeof this.props.cart != 'undefined'){
      this.setState({cart: this.props.cart}, ()=>{this.updateTotal()});
    }
  }

  updateTotal(){
    let total = 0;
    for (let index = 0; index < this.state.cart.length; index++) {
      const item = this.state.cart[index];
      total = total + parseInt(item.cantidad) * parseInt(item.price);
    }
    this.setState({total});
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <AYTitleIcon text="Mi Carrito" imageIcon={require('../assets/images/icono_patita.png')} />
          
            <View style={{width: '100%'}}>
            {this.state.cart.map((producto, i)=>{
                        return (                     
                        <AYProductoCarrito 
                        key={i}
                        index={i}
                        producto={producto}
                        onDelete={()=>{
                          this.setState({cart: this.props.cart}, ()=>{this.updateTotal()});
                          }}
                        onChange={()=>{ 
                          this.updateTotal();
                          
                        }}
                        />
                        );
                    })}
            </View>
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
              }}>Total: ${this.state.total}</Text>
            </View>
            <TouchableHighlight 
                onPress={()=>{
                  this.props.navigation.navigate("DatosEnvio");
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
                    <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Comprar productos</Text>
            </TouchableHighlight>

          <View style={{ height: 150 }} />
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
      </View>   	
    );
  }
}

function mapStateToProps(state){
    const { cart } = state.cart;
    return { cart } 
}

function mapDispatchToProps(dispatch){
    return {
        login : (token) => dispatch({type: 'LOGIN', payload: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);