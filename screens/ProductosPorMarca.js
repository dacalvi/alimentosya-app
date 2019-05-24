import React from 'react';
import  LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYTituloMarca from '../components/AYTituloMarca';
import { Button } from 'react-native-material-ui';
import { Image, View, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import FullWidthImage from 'react-native-fullwidth-image';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;


function BotonCategoria(props){
    return <div>Hello {props.name}</div>
}


class ProductosPorMarca extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTintColor: '#FF0000',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    username: '',
    password: '',
    categorias : [
        {key:'1','nombre': 'Electricidad'},
        {key:'2','nombre': 'Plomeria'}
    ]
  };

  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <AYBuscador onSearch={()=>{ console.log('search')}}/>
            
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
            
            <View style={{width: '40%', paddingLeft: 10, paddingTop: 5}}>
                <AYTituloMarca image={require('../assets/images/marca.png')} titulo="Alimento para perros"/>
            </View>
            
            <View style={{ flex:1, flexDirection: 'row', width: '50%'}}>
              <AYCategoriaChip 
                text="Perros" 
                icon={require('../assets/images/icono_perro.png')}
                onPress={()=>{ console.log('Perros')}}
                />
              <AYCategoriaChip 
                text="Gatos" 
                icon={require('../assets/images/icono_gato.png')} 
                onPress={()=>{ console.log('Gatos')}}
                />
            </View>
          </View>



            <View style={{width: '100%'}}>
            <AYProducto 
                producto={{
                    marca: "Royal Canin", 
                    producto_nombre: "Mini Adult",
                    presentaciones: [
                        {
                            id_presentacion: '1',
                            presentacion_nombre: '7,5Kg', 
                            presentacion_precio: '$1327',
                            image: 'https://via.placeholder.com/100x150?text=7.5Kg',
                            precio: '1234'
                        } , {
                            id_presentacion: '2',
                            presentacion_nombre: '15Kg', 
                            presentacion_precio: '$5000',
                            image: 'https://via.placeholder.com/100x150?text=15Kg',
                            precio: '5641'
                        }
                    ]}} 
                onComprarPressed={(selectedItem, presentacion, cantidad)=>{console.log(selectedItem, presentacion, cantidad)}}
                cantidadInicial={1}
                />

            </View>


          <View style={{ height: 150 }} />
        </ScrollView>
        <View><AYChatButton /></View>
      </View>



    	
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductosPorMarca);


  
