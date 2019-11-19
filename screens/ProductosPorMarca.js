import React from 'react';
import  LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYTituloMarca from '../components/AYTituloMarca';
import AYCarritoIcono from '../components/AYCarritoIcono';

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
  
  loading = false;

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

  
  state = {
    marca: this.props.navigation.state.params.marca,
    productos: []
  };

  componentWillMount(){
    this.setState({loading:true});    
    const api = new RestApi();
    api.productos( this.props.navigation.state.params.marca.id )
    .then((productos)=>{
      this.productosCompletos = productos;
      this.setState({productos});
      this.setState({loading:false});
    })
    .catch((err)=>{
      console.log(err);
      this.setState({loading:false});
    });
  }

  filtrarPorAnimal(animal){
    if(animal){
      productos = this.productosCompletos.filter(producto => producto.type == animal);      
      console.log("ESTOS SON LOS PRODUCTOS FILTRADOS: ", productos);
      this.setState({productos});
    }
    
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <AYBuscador navigation={this.props.navigation} />
            
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
              
              



              <Image style={{
                marginTop: 10, 
                width: '45%', 
                marginLeft: -10,
                height: 30
              }} source={{uri: this.props.navigation.state.params.marca.logo}} resizeMode={'contain'}/>



              <View style={{ flex:1, flexDirection: 'row', width: '40%'}}>
                <AYCategoriaChip 
                  text="Perros" 
                  icon={require('../assets/images/icono_perro.png')}
                  onPress={()=>{ 
                    this.filtrarPorAnimal('Perro');
                    console.log('Perros')}}
                  />
                <AYCategoriaChip 
                  text="Gatos" 
                  icon={require('../assets/images/icono_gato.png')} 
                  onPress={()=>{                  
                    this.filtrarPorAnimal('Gato');
                    console.log('Gatos')}}
                  />
              </View>
            </View>
          
          <View style={{width: '100%'}}>
          { 
            this.state.loading? 
            <Text>Cargando...</Text>:
            undefined
          }
          {this.state.productos.map((producto, i)=>{
                    return (                     
                      <AYProducto 
                      key={i}
                      producto={{
                          marca: this.props.navigation.state.params.marca.name, 
                          producto_nombre: producto.title,
                          presentaciones: producto.presentations}} 
                          onComprarPressed={(selectedItem, presentacion, cantidad)=>{
                              this.props.addToCart({
                                'image': presentacion.image,
                                'marca': selectedItem.marca,
                                'producto_nombre': selectedItem.producto_nombre,
                                'price': presentacion.price,
                                'weight': presentacion.weight,
                                'cantidad': cantidad,
                                'id': presentacion.id
                              });
                              this.props.navigation.navigate("Carrito");
                        
                      }}
                      cantidadInicial={1}
                      />
                    );
                })}
          </View>

          <View style={{ height: 150 }} />
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
      </View>   	
    );
  }
}

function mapStateToProps(state){
  const { cart } = state;
  return { cart } 
}

function mapDispatchToProps(dispatch){
    return {
        addToCart: (item) => dispatch({type: 'ADD_TO_CART', payload: item}),
        login : (token) => dispatch({type: 'LOGIN', payload: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductosPorMarca);