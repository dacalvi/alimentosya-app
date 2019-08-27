import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

class AYRedCircle extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{    
                backgroundColor: this.props.color, 
                borderRadius: 30,
                width: 40,
                maxWidth:40,
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
                marginHorizontal: 5,
                marginVertical: 10,
                flex:1,
                }}>
                <Text style={{
                    color: 'white', 
                    fontSize: 24, 
                    fontWeight: 'bold', 
                    textAlign: 'center'}}>{this.props.text}</Text>
            </View>
        )
    }
};


AYRedCircle.propTypes = {
    color: PropTypes.string
}
AYRedCircle.defaultProps = {
    color: '#CCCCCC'
}

export default AYRedCircle;
