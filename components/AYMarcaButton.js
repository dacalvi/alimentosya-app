import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    stretch: {
      width: 100,
      height: 50
    }
});

const AYMarcaButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ 
                borderColor: '#EEEEEE', 
                borderWidth: 10, 
                margin: 10, 
                borderRadius: 25, 
                flex: 1,
                alignItems: 'center',
                padding: 20
                }}>
                <Image style={styles.stretch} source={require('../assets/images/marca.png')}/>
                <Text style={{marginTop: 10, width: '100%', marginLeft: 20}} >{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default AYMarcaButton;