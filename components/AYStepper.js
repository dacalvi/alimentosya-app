import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class AYStepper extends React.Component{
    
    state = { value: null }

    componentWillMount(){
        this.setState({value: this.props.initialValue});
    }

    constructor(props){
        super(props);
    }
    
    decrease(){
        if(this.state.value > this.props.min){
            this.setState({value: this.state.value-1}, ()=>{this.props.onChange(this.state.value)});
        }
    }

    increase(){
        if(this.state.value < this.props.max){
            this.setState({value: +this.state.value+1}, ()=>{this.props.onChange(this.state.value)});
        }
    }

    render(){
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableHighlight 
                    onPress={()=>{ this.decrease()}}
                    style={{ 
                        backgroundColor: '#FF0000',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 3,
                        marginRight: 10
                        }}
                    >
                    <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>-</Text>
                </TouchableHighlight>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 5}}>{this.state.value}</Text>
                <TouchableHighlight
                    style={{ 
                        backgroundColor: '#FF0000',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 3,
                        marginLeft: 10
                        }}
                    onPress={()=>{ this.increase()}}>
                    <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>+</Text>
                </TouchableHighlight>
            </View>
        )
    }
};

