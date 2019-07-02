import React from 'react';
import { 
    View, 
    Image, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';


const styles = StyleSheet.create({
    stretch: {
      width: 50,
      height: 50
    }
});

export default class AYChatButton extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Consultas')}}>
                <View style={{ height: 60, alignItems: 'center', padding: 5}}>
                    <Image style={styles.stretch} source={require('../assets/images/chat.png')}/>
                </View>
            </TouchableOpacity>
        )
    }
};

