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
            <View style={{marginRight:10}}>
               <Image 
                style={{
                    width: 25,
                    height: 25
                }}
                source={require('../assets/images/carrito.png')}/>
                <View style={{ 
                    left: 15,
                    top: -10,
                    backgroundColor: 'black', 
                    position: 'absolute', 
                    borderRadius: 10, 
                    paddingLeft: 5, 
                    paddingRight: 5
                    }}>
                <Text style={{color: 'white'}}>{this.props.cantidad}</Text>
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