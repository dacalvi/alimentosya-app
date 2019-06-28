import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class AYPresentacion extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity 
                    style={{ 
                        marginRight: 5,
                        padding: 5,
                        borderRadius: 3,
                        backgroundColor:  this.props.seleccionado == true ? '#FF7F00': '#A3A3A3'  
                    }}
                    onPress={ 
                        ()=>{
                            this.props.onSelectPresentacion(this.props.presentacion);
                            }}
                    >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.presentacion.weight}</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

