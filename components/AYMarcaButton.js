import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    stretch: {
      width: 100,
      height: 50
    }
});


export default class AYMarcaButton extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress}>
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

                </View>
            </TouchableOpacity>
        )
    }
};

