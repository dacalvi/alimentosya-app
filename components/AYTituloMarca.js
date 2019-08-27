import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    stretch: {
      width: 50,
      height: 25
    }
});

export default class AYTituloMarca extends React.Component{
    
    state = {}

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image resizeMode={'contain'} style={styles.stretch} source={this.props.image}/>
                <Text style={{ fontSize: 8 }}>{this.props.titulo}</Text>
            </View>
        )
    }
};

