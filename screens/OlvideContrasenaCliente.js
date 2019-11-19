import React from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYChatButton from '../components/AYChatButton';
import LogoTitle from '../components/LogoTitle';
import styles from '../constants/Styles';
import validate from '../constants/validate_wrapper';


class OlvideContrasenaCliente extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',            
      emailError: '',
      buttonRecuperarDisabled: false,
      buttonRecuperarText: 'RECUPERAR CONTRASEÑA'
    }
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


  btnRecuperarClick = () => {
    const emailError = validate('email', this.state.email);
    this.setState({emailError});

    if(!emailError){
      this.setState({
        buttonRecuperarDisabled: true,
        buttonRecuperarText: "ENVIANDO..."
      });
      let api = new RestApi();
      api.olvideContrasenaCliente({'username': this.state.email })
      .then((responseJson) => {
        
        Alert.alert('Listo!', responseJson);
        this.setState({
          buttonRecuperarDisabled: true,
          buttonRecuperarText: "ENVIADO" 
        });
        this.props.navigation.navigate('LoginCliente');
      })
      .catch((error)=>{
        Alert.alert('Error!', error);
        console.log(error);
        this.setState({
          buttonRecuperarDisabled: false,
          buttonRecuperarText: "RECUPERAR CONTRASEÑA"
        });
      })
      
    }

  }


  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <AYTitleIcon text="Olvide mi contraseña" imageIcon={require('../assets/images/icono_patita.png')} />
            </View>


            <View style={{
              flex:1, 
              flexDirection: 'row', 
              marginLeft: 10, 
              marginBottom: 0,
              marginTop: 50
              }}>
              <View style={{flex:1, flexDirection: 'row', padding: 5}}>
                  <TextInput
                      placeholder="Email"    
                      style={{
                          width: '95%',
                          fontSize: 18,
                          borderBottomWidth: 1,
                          marginHorizontal: undefined
                      }}
                      value={this.state.email}
                      onChangeText={ email => {
                          this.setState({email});
                      }}                           
                      />
                  <Text style={{color: 'red', marginLeft: -20,marginTop:7}}>*</Text>
              </View>
              
            </View>
            <View style={{ marginHorizontal: 15, marginBottom: 10}}>
              { this.state.emailError ? <Text style={{color: 'red'}}>{this.state.emailError}</Text> : <Text> </Text> }
            </View>

            

            <Image 
              source={ require('../assets/images/wawis.png') } 
              style={{ width: imageWidth, marginTop: 0, marginBottom: 10 }} />

            <TouchableHighlight
                disabled={this.state.buttonRecuperarDisabled}
                onPress={()=>{
                  this.btnRecuperarClick();
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
                <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>
                {this.state.buttonRecuperarText}
                </Text>
            </TouchableHighlight>

            
          <View style={{ height: 50 }} />
        </ScrollView>
        <View><AYChatButton navigation={this.props.navigation} /></View>
      </View>   	
    );
  }
}

function mapStateToProps(state){
  return {
      cart: state.cart
  }
}

function mapDispatchToProps(dispatch){
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(OlvideContrasenaCliente);

const dimensions = Dimensions.get('window');


const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;