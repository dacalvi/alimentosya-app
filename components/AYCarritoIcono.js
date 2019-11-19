import React from 'react';
import { 
    View,
    Image,
    Text,
    TouchableHighlight
 } from 'react-native';

import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
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
        this.setState({cantidadItems: this.props.cart.cart.length});
        //if(!isFetching && listNotUpdated){
            //this.props.navigation.setParams({ navigation: nextProp.navigation})
        //}
    }

    render(){

        return (
            <TouchableHighlight 
                underlayColor="#ffffff00"
                onPress={ ()=>{this.props.navigation.navigate("Carrito")} }>
                <View style={styles.container}>
                    
                    <Image 
                        style={styles.image}
                        source={require('../assets/images/carrito.png')}/>
                    <View style={styles.bubble}>
                        { 
                            this.props.cart.cart.length > 0 ? 
                            <Text style={styles.bubbleText}>{this.props.cart.cart.length}</Text>:undefined
                        }
                    </View>
                </View>
            </TouchableHighlight>
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

var styles = StyleSheet.create({
    container : {
        marginRight:10
    },
    image: {
        width: 25,
        height: 25
    },
    bubble : {
        left: 15,
        top: -10,
        backgroundColor: 'black', 
        position: 'absolute', 
        borderRadius: 10, 
        paddingLeft: 5, 
        paddingRight: 5
    },
    bubbleText : {
        color: 'white', 
        fontSize: 11
    }
});
