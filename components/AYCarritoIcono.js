import React from 'react';
import { 
    View,
    Image,
    Text,
    TouchableHighlight
 } from 'react-native';

export default class AYCarritoIcono extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{marginRight: 20}}>
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

