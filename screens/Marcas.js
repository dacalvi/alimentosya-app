import React from 'react';
import  LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYMarcaButton from '../components/AYMarcaButton';
import AYChatButton from '../components/AYChatButton';
import { Button } from 'react-native-material-ui';
import { Image, View, Text, ScrollView } from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import FullWidthImage from 'react-native-fullwidth-image';
import RestApi from '../common/RestApi';
import AYCarritoIcono from '../components/AYCarritoIcono';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

class Marcas extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerRight: <AYCarritoIcono/> ,
    headerLeft: <Text></Text> ,
    headerTintColor: '#FF0000',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  }

  todosLosProductos = [];

  state = {
    username: '',
    password: '',
    marcas: []
  }

  filtrarPorAnimal(animal){
    console.log(animal, this.state.marcas);
    if(animal){
      marcas = this.todosLosProductos.filter(producto => producto.tipos.indexOf(animal) > -1)      
      console.log("ESTOS SON LOS PRODUCTOS FILTRADOS: ", marcas);
      this.setState({marcas});
    }
  }

  componentWillMount(){
    const api = new RestApi();
    console.log('marcas');
    api.marcas()
    .then((marcas)=>{
      console.log(marcas)
      this.todosLosProductos = marcas;
      this.setState({marcas});
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
          
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Image style={{ flex:1, width: null, height: 170 }} resizeMode='cover' source={require('../assets/images/envio_gratis.png')} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
            <Text style={{marginTop: 10, width: '40%', marginLeft: 20}}>Elegí tu marca</Text>
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

          
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              {this.state.marcas.map((marca, i)=>{
                    return (
                      <AYMarcaButton 
                        key={i}
                        name={marca.name}
                        logo={marca.logo} 
                        onPress={()=>{this.props.navigation.navigate('ProductosPorMarca', { marca })}}
                      />
                    );
                })}
            </View>

          

          <View style={{ height: 150 }} />
        </ScrollView>

        <View>
          <AYChatButton navigation={this.props.navigation} />
        </View>
      </View>    	
    )
  }
};

function mapStateToProps(state){
    return {} 
}

function mapDispatchToProps(dispatch){
    return {
        login : (token) => dispatch({type: 'LOGIN', payload: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Marcas);