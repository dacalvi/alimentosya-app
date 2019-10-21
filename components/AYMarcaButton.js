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
        <View style={{ 
                
                borderColor: '#EEEEEE', 
                borderWidth: 10, 
                margin: 10,
                marginHorizontal:'5%',
                borderRadius: 25, 
                width: '40%',
                alignItems: 'center',
                padding: 20
                
                }}>
            <TouchableOpacity onPress={props.onPress}>
                <Image style={styles.stretch} source={{uri: props.logo}} resizeMode={'contain'}/>
            </TouchableOpacity>
        </View>
    )
};

export default AYMarcaButton;