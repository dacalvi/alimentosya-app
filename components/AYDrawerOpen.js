import React from 'react';
import { StyleSheet, Text, TouchableHighlight, Alert } from 'react-native';
import { onSignOut } from '../common/auth';

const styles = StyleSheet.create({
    circlesText: {
        fontSize: 24, 
        marginRight: -15, 
        marginLeft: 5
    },
    circles: {
        paddingTop: 15,
        paddingLeft: 10,
        
        
    }
});





export default  class AYDrawerOpen extends React.Component {
    
    constructor(props){
        super(props);
    }

    promptExit(){
        Alert.alert('Cerrar sesion',
        'Esta a punto de cerrar la sesion. Se borraran sus credenciales y tendra que volver a ingresar para poder cargar un carrito.',
        [
            {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
            },
            {text: 'Si, salir', onPress: () => this.logout() },
        ],
        {cancelable: true}
        );
    }

    logout(){
        onSignOut();
        this.props.navigation.navigate("Marcas");
    }

    render(){
        return (
            <TouchableHighlight 
                underlayColor="#ffffff00"
                onPress={()=>{ this.promptExit(); }}
                style={styles.circles}>
            <Text style={styles.circlesText}>°°°</Text>
            </TouchableHighlight>
        );
    }

}