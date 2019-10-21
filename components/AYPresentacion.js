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
            
                <TouchableOpacity 
                    style={{ 
                        marginRight: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginBottom: 5,
                        borderRadius: 3,
                        wrap: 'wrap',
                        backgroundColor:  this.props.seleccionado == true ? '#FF7F00': '#A3A3A3'  
                    }}
                    onPress={ 
                        ()=>{
                            this.props.onSelectPresentacion(this.props.presentacion);
                            }}
                    >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.presentacion.weight}</Text>
                </TouchableOpacity>
            
        )
    }
};

