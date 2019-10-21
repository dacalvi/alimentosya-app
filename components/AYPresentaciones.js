import React from 'react';
import { View, Text } from 'react-native';
import AYPresentacion from './AYPresentacion';

export default class AYPresentaciones extends React.Component{
    
    state = {
        indiceSeleccionado: 0
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    flexWrap: 'wrap'
                    
                    }}>
                {this.props.presentaciones.map((presentacion, i)=>{
                    return (
                    <AYPresentacion 
                        presentacion={ presentacion }
                        seleccionado={ this.state.indiceSeleccionado == i }
                        onSelectPresentacion={(currentPresentacion)=>{
                            this.setState({indiceSeleccionado: i})
                            this.props.onSelectPresentacion(currentPresentacion)
                            }}
                        key={i} />
                    );
                })}
            </View>
        )
    }
};

