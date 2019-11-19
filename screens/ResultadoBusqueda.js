import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYBuscador from '../components/AYBuscador';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYChatButton from '../components/AYChatButton';
import AYProducto from '../components/AYProducto';
import LogoTitle from '../components/LogoTitle';
import layout from '../constants/Layout';
import styles from '../constants/Styles';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;



class ResultadoBusqueda extends React.Component {

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
      headerLeft: <Text></Text>,
      headerTintColor: '#FF0000',
      headerTitleStyle: {flex: 1, textAlign: 'center'}
    }
  }

  state = {
    marca: this.props.navigation.state.params.marca,
    productos: []
  };

  componentWillMount(){
    console.log(this.props.navigation.state.params); 
    const api = new RestApi();
    api.buscar( this.props.navigation.state.params )
    .then((productos)=>{
      console.log(productos);
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
            <AYBuscador navigation={this.props.navigation} />
            
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
            
              <View style={{width: '40%', paddingLeft: 10, paddingTop: 5}}>
                  
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
            <Text style={{ 
              fontSize: 14, 
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: 10
              }}>Resultados de búsqueda para {this.props.navigation.state.params.q}</Text>
          <View style={{width: '100%'}}>
          {this.state.productos.map((producto, i)=>{
                    return (                     
                      <AYProducto 
                      key={i}
                      producto={{
                          marca: producto.brand_name, 
                          producto_nombre: producto.title,
                          presentaciones: producto.presentations}} 
                          onComprarPressed={(selectedItem, presentacion, cantidad)=>{

                            this.props.addToCart({
                              cantidad,
                              id: presentacion.id,
                              image: presentacion.image,
                              marca: selectedItem.marca,
                              producto_nombre: selectedItem.producto_nombre,
                              weight: presentacion.weight,
                              price: presentacion.price                            
                            });

                            //Si estoy logueado ir al carrito
                            this.props.navigation.navigate('Carrito');
                            //Sino, ir a login
                            //console.log(selectedItem, presentacion, cantidad)

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
    return {} 
}

function mapDispatchToProps(dispatch){
    return {
        addToCart: (item) => dispatch({type: 'ADD_TO_CART', payload: item}),
        login : (token) => dispatch({type: 'LOGIN', payload: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultadoBusqueda);