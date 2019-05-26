import React from 'react';
import  LogoTitle  from '../components/LogoTitle';
import { Button } from 'react-native-material-ui';
import { Image, View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import FullWidthImage from 'react-native-fullwidth-image';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;


function BotonCategoria(props){
    return <div>Hello {props.name}</div>
}

class Consultas extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTintColor: '#FF0000',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };
  
  btnConsultaClick(){
    if(this.state.name !== '' && this.state.email !== '' && this.state.text !== ''){
      console.log({
        ...this.state
      })
      let api = new RestApi();
      api.consultar({
        ...this.state
      })
      .then((response)=>{
        this.props.navigation.navigate('Marcas');
        alert(response.success);
      })
      .catch((err)=>{
        console.log("ERROR?"+err);
        alert(response.error);
      });
    }else{
      alert('Por favor, complete todos los datos!');
    }
  }

  state = {
    name: '',
    email: '',
    text: ''
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Image style={{ flex:1, width: null, height: 170 }} resizeMode='cover' source={require('../assets/images/envio_gratis.png')} />
          </View>
                    
          <TextInput
            textContentType='none'
            label='Name'
            mode='flat'
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={{backgroundColor: Colors.white, marginHorizontal: 20,  marginBottom: 20}}
          />
          
          <TextInput
            textContentType='emailAddress'
            label='Email'
            mode='flat'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={{backgroundColor: Colors.white, marginHorizontal: 20,  marginBottom: 20}}
          />

          <TextInput
            textContentType='none'
            label='Consulta'
            mode='flat'
            multiline={true}
            numberOfLines={4}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            style={{backgroundColor: Colors.white, marginHorizontal: 20,  marginBottom: 20}}
          />

          <TouchableHighlight 
            onPress={ () => { this.btnConsultaClick(); } }
            style={{    
                backgroundColor: '#FF0000', 
                borderRadius: 20,
                width: '90%',
                height: 60,
                justifyContent: 'center',
                alignContent: 'center',
                marginHorizontal: 20,
              }}> 
              <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Enviar</Text>
          </TouchableHighlight>

        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Consultas);