import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import AYPresentaciones from './AYPresentaciones';
import AYStepper from './AYStepper';

const styles = StyleSheet.create({
    stretch: {
      width: 75,
      height: 107
    }
});

export default class AYProducto extends React.Component{
    
    constructor(props){
        super(props);
    }

    componentWillMount(){
        
        this.setState({
            currentPresentacion : this.props.producto.presentaciones[0],
            cantidad : 0,
            total: this.props.producto.presentaciones[0].price * 0
        });
    }

    update(){
        let total = this.state.cantidad * this.state.currentPresentacion.price;
        this.setState({total});
    }

    render(){
        return (
            <View style={{ 
                flex : 1, 
                flexDirection: 'row',
                padding: 10,
                marginTop: 20
                 }}>
                <View style={{width: '25%'}}>
                    <Image 
                    style={styles.stretch} 
                    source={{uri: this.state.currentPresentacion.image}}/>
                </View>
                <View style={{ paddingLeft: 10, width: '45%' }}>
                    <Text style={{fontWeight: 'bold'}}>{ this.props.producto.marca }</Text>
                    <Text>{ this.props.producto.producto_nombre }</Text>
                    
                    <AYPresentaciones 
                        presentaciones={ this.props.producto.presentaciones }
                        indiceInicial={ 0 }
                        onSelectPresentacion={(currentPresentacion)=>{ 
                            this.setState({
                                currentPresentacion,
                                total: currentPresentacion.price * this.state.cantidad
                            }) 
                        }}
                        />
                    { <Text style={{fontWeight: 'bold', fontSize: 20}}>${this.state.total}</Text> }
                    <AYStepper 
                        min={0} 
                        max={10} 
                        initialValue={0} 
                        onChange={(cantidad)=> {
                            this.setState({cantidad}, ()=>{
                                this.update();
                            });
                        }}/>
                </View>
                <View style={{ 
                    width: '20%', 
                    flex:1, 
                    flexDirection: 'column', 
                    justifyContent: 'center'
                    }}>
                    <TouchableHighlight 
                        onPress={()=>{this.props.onComprarPressed(this.props.producto, this.state.currentPresentacion, this.state.cantidad )}}
                        style={{    
                            backgroundColor: '#FF0000', 
                            borderRadius: 10,
                            padding: 5,
                            height: 40,
                            justifyContent: 'center',
                            alignContent: 'center'
                            }}> 
                            <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Comprar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
};

