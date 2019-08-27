import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import AYPresentaciones from './AYPresentaciones';
import AYStepper from './AYStepper';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    stretch: {
      width: 75,
      height: 107
    }
});

class AYProductoCarrito extends React.Component{
    
    state = { cantidad: 0 };

    constructor(props){
        super(props);
    }

    componentWillMount(){
    }
    
    componentDidMount(){
        this.setState({cantidad: this.props.producto.cantidad});

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("DID UPDATE",prevProps, prevState, snapshot);
        // Typical usage (don't forget to compare props):
        if (this.props.producto.cantidad !== prevProps.producto.cantidad) {
            this.setState({cantidad: this.props.producto.cantidad});
        }
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
                    source={{uri: this.props.producto.image}}/>
                </View>
                <View style={{ paddingLeft: 10, width: '45%' }}>
                    <Text style={{fontWeight: 'bold'}}>{ this.props.producto.marca }</Text>
                    <Text>{ this.props.producto.producto_nombre }</Text>
                    
                    
                    <View style={{flex:1, flexDirection: "row"}}>
                        { <Text style={{fontWeight: 'bold', fontSize: 20}}>${this.state.cantidad * this.props.producto.price}</Text> }
                        <View style={{ 
                                width: 50,
                                marginRight: 5,
                                padding: 5,
                                marginVertical: 5,
                                marginHorizontal: 10,
                                borderRadius: 3,
                                backgroundColor:  '#FF7F00' }}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.producto.weight}</Text>
                        </View>
                    </View>
                    
                    
                    
                    <AYStepper 
                        min={1} 
                        max={10} 
                        initialValue={this.props.producto.cantidad} 
                        onChange={(cantidad)=> {
                            //console.log(cantidad);
                            this.props.update_qty({
                                cantidad: cantidad,
                                id: this.props.producto.id
                            });
                            this.setState({cantidad});
                            this.props.onChange();
                        }}/>
                </View>
                <View style={{ 
                    width: '20%', 
                    flex:1, 
                    flexDirection: 'column', 
                    justifyContent: 'center'
                    }}>
                    <TouchableHighlight 
                        onPress={()=>{ 
                            this.props.delete_item(this.props.index);
                            this.props.onDelete();
                            }}
                        style={{    
                            backgroundColor: '#FF0000', 
                            borderRadius: 10,
                            padding: 5,
                            height: 40,
                            justifyContent: 'center',
                            alignContent: 'center'
                            }}> 
                            <Text style={{ color: 'white', fontWeight:  'bold', fontSize: 18, textAlign: 'center'}}>Eliminar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
};


function mapStateToProps(state){
    const { cart } = state.cart;
    return { cart } 
}

function mapDispatchToProps(dispatch){
    return {
        delete_item: (index) => dispatch({type: 'DELETE_ITEM', payload: {id: index}}),
        update_qty : (item) => dispatch({type: 'UPDATE_QTY', payload: item})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AYProductoCarrito);
