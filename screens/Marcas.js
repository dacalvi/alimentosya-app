import { Spinner } from 'native-base';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYBuscador from '../components/AYBuscador';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYChatButton from '../components/AYChatButton';
import AYMarcaButton from '../components/AYMarcaButton';
import LogoTitle from '../components/LogoTitle';
import layout from '../constants/Layout';
import styles from '../constants/Styles';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

class Marcas extends React.Component {

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

  loading = false;

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
    this.setState({loading:true});
    api.marcas()
    .then((marcas)=>{
      this.todosLosProductos = marcas;
      this.setState({marcas});
      this.setState({loading:false});
    })
    .catch((err)=>{
      this.setState({loading:false});
      console.log(err);
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <AYBuscador navigation={this.props.navigation} />
          
          <View style={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'red'}}>
            <Image 
            style={{ flex:1, width: '100%', height: 150 }} 
            resizeMode='contain' 
            source={require('../assets/images/envio_gratis.png')} />
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
                { 
                  this.state.loading?
                  <Spinner color='red' />:
                  undefined
                }
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