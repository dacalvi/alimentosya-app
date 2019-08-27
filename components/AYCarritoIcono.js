import React from 'react';
import { 
    View,
    Image,
    Text,
    TouchableHighlight
 } from 'react-native';

 import { connect } from 'react-redux';
class AYCarritoIcono extends React.Component{
    
    state = {
        cart : [],
        cantidadItems: 0
    }

    constructor(props){
        super(props);
    }

    componentWillMount(){    
        this.setState({cantidadItems: this.props.cart.cart.length});
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    componentWillReceiveProps(nextProp){

        //console.log("componentWillReceiveProps", nextProp);
        this.setState({cantidadItems: this.props.cart.cart.length});
        //if(!isFetching && listNotUpdated){
            //this.props.navigation.setParams({ navigation: nextProp.navigation})
        //}
    }

    render(){
        return (
            <View style={{marginRight: 20}}>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Carrito');}}>
                    <Image 
                        style={{
                            width: 25,
                            height: 25
                        }}
                        source={require('../assets/images/carrito.png')}/>
                </TouchableHighlight>
                    <View style={{ 
                        left: 18,
                        top: -10,
                        backgroundColor: 'black', 
                        position: 'absolute', 
                        borderRadius: 10, 
                        paddingLeft: 5, 
                        paddingRight: 5
                        }}>
                        <Text style={{color: 'white', fontSize: 10}}>{this.state.cantidadItems}</Text>
                    </View>
            </View>
        )
    }
};

function mapStateToProps(state){
    return { cart: state.cart } 
}
  
function mapDispatchToProps(dispatch){
    return {}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AYCarritoIcono);