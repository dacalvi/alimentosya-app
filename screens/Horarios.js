import React from 'react';
import LogoTitle  from '../components/LogoTitle';
import AYBuscador from '../components/AYBuscador';
import AYCategoriaChip from '../components/AYCategoriaChip';
import AYProducto from '../components/AYProducto';
import AYChatButton from '../components/AYChatButton';
import AYCarritoIcono from '../components/AYCarritoIcono';
import AYRedCircle from '../components/AYRedCircle';
import AYTimeSlots from '../components/AYTimeSlots';
import { 
    Image, 
    View, 
    Text, 
    ScrollView, 
    KeyboardAvoidingView, 
    StyleSheet, 
    TouchableHighlight,
    Alert
} from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import RestApi from '../common/RestApi';
import AYPresentacion from '../components/AYPresentacion';
import { Spinner } from 'native-base';

class Horarios extends React.Component {

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
    horarios: [],
    selectedSlots: []
  }

  componentWillMount(){
    this.setState({loading:true});
    const api = new RestApi();
    api.shippingtime()
    .then((horarios)=>{
      console.log(horarios);
      this.setState({horarios});
      this.setState({loading:false});
    })
    .catch((err)=>{
      console.log(err);
      this.setState({loading:false});
    });
  }


  btnContinuarClick(){
    if(this.state.selectedSlots.length == 0 && Object.keys(this.state.horarios).length > 0){
        Alert.alert("Error", "Ingrese al menos un horario para entrega");
    }else{
        this.props.addTimeSlots(this.state.selectedSlots);
        this.props.navigation.navigate("SeleccionarMedioPago");
    }
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <AYTitleIcon text="Horarios" imageIcon={require('../assets/images/icono_patita.png')} />
                <View style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    alignContent: 'flex-end',
                    width:150,
                    maxWidth: 160,
                    marginTop: 10
                    }}>
                    <AYRedCircle text={1}/>
                    <AYRedCircle text={2}  color='#FF0000'/>
                    <AYRedCircle text={3}/>
                </View>
            </View>

            <View style={{
                
                marginHorizontal: 30,
            }}>
            { 
                  this.state.loading?
                  <View>
                    <Spinner color='red' />
                    <Text style={{textAlign:"center"}}>Buscando horarios de entrega...</Text>
                  </View> :
                  undefined
                }

                <Text style={{marginBottom:30}}>Seleccione el horario para la entrega del producto tocando sobre el boton correspondiente. </Text>

            <AYTimeSlots 
                slots={this.state.horarios}
                loading={this.state.loading}
                onChange={(selectedSlots)=>{
                    this.setState({selectedSlots})
                }} />
            </View>

            <TouchableHighlight 
                onPress={()=>{this.btnContinuarClick();}}
                style={{    
                    backgroundColor: '#FF0000', 
                    borderRadius: 10,
                    padding: 5,
                    height: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginHorizontal: 10,
                    marginVertical: 10
                    }}> 
                    <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Continuar</Text>
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
        addTimeSlots: (timeSlots) => dispatch({type: 'ADD_TIME_SLOTS', payload: timeSlots}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Horarios);