import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

export default class AYFacebookLoginButton extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',  alignContent: 'center', minHeight: 70}}>
                <TouchableHighlight onPress={() => {this.props.onPress()} }>
                    <Image source={require('../assets/images/fb-login-button.png')} />
                </TouchableHighlight>
            </View>
        )
    }
};

