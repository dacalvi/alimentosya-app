import React from 'react';
import { View, Image } from 'react-native';

export default class AYFacebookLoginButton extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',  alignContent: 'center', minHeight: 70}}>
               <Image source={require('../assets/images/fb-login-button.png')} />
            </View>
        )
    }
};

