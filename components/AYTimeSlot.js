import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

export default class AYTimeSlot extends React.Component{
    
    constructor(props){
        super(props);
    }

    state = {
        active: false
    }

    

    render(){
        return (
            <TouchableHighlight onPress={()=>{
                this.setState({active: !this.state.active})
                if(this.state.active){
                    this.props.onDeactivate(this.props.id);
                }else{
                    this.props.onActivate(this.props.id);
                }
                }}>
                <View
                    style={{
                    borderRadius: 5,
                    padding:3,
                    backgroundColor: this.state.active? 'orange' : 'gray',
                    marginVertical: 5,
                    marginRight: 5
                }}>
                    <Text style={{color: this.state.active? 'black' : 'white'}} >{this.props.label}</Text>
                </View>
            </TouchableHighlight>
        );
    }

}