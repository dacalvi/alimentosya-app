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
import RestApi from '../common/RestApi';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;


class ProductosPorMarca extends React.Component {

  productosCompletos = [];

  constructor(props){
    super(props);
    
  }
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTintColor: '#FF0000',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    marca: this.props.navigation.state.params.marca,
    productos: []
  };

  componentWillMount(){    
    const api = new RestApi();
    api.productos( this.props.navigation.state.params.marca.id )
    .then((productos)=>{
      this.productosCompletos = productos;
      this.setState({productos});
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <AYBuscador onSearch={()=>{ console.log('search')}}/>
            
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
            
              <View style={{width: '40%', paddingLeft: 10, paddingTop: 5}}>
                  <AYTituloMarca image={{uri: this.props.navigation.state.params.marca.logo}} titulo="Alimento para perros"/>
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
          {this.state.productos.map((producto, i)=>{
                    return (                     
                      <AYProducto 
                      key={i}
                      producto={{
                          marca: this.props.navigation.state.params.marca.name, 
                          producto_nombre: producto.title,
                          presentaciones: producto.presentations}} 
                      onComprarPressed={(selectedItem, presentacion, cantidad)=>{console.log(selectedItem, presentacion, cantidad)}}
                      cantidadInicial={0}
                      />
                    );
                })}
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