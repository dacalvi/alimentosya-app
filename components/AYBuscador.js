import React from 'react';
import { View, TextInput, TouchableHighlight } from 'react-native';
import { withTheme, Avatar } from 'react-native-paper';

export default class AYBuscador extends React.Component{
    
    state = {
        searchString : ''
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ 
                    backgroundColor: '#FF7F00', 
                    height: 60, 
                    width: '100%', 
                    flex: 1, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    paddingLeft: 10
                }}>
                <TextInput 
                    placeholderTextColor="white" 
                    placeholder="Buscar Alimento"
                    onChangeText={ (searchString)=>{ this.setState({searchString}); }}
                    style={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        fontSize: 18,
                        width: '80%'
                    }}/>
                <TouchableHighlight onPress={() => {
                    if(this.state.searchString !== ''){
                        this.props.navigation.navigate('ResultadoBusqueda', {q: this.state.searchString})
                    }
                    }}>
                    <Avatar.Icon 
                        size={46} 
                        icon="search" 
                        color="white"
                        style={{
                            marginTop: 10,
                            backgroundColor: '#FF7F00'
                        }}    
                    />
                </TouchableHighlight>
            </View>
        )
    }
};

