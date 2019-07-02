import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    stretch: {
      width: 22,
      height: 20
    }
});

export default class AYCategoriaChip extends React.Component{
    
    state = {

    }


    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableOpacity 
            style={{
                flex:1,
                backgroundColor: '#FF0000',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginHorizontal: 5,
                with:'100%'
            }}
            onPress={this.props.onPress}>
                <View 
                    style={{ flex: 1, flexDirection: 'row', padding: 10}}>
                    <Image style={styles.stretch} source={this.props.icon} resizeMode={'contain'}/>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
};

