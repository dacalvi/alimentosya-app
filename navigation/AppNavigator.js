import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import LoginCliente from '../screens/LoginCliente';
import RegistroCliente from '../screens/RegistroCliente';
import OlvideContrasenaCliente from '../screens/OlvideContrasenaCliente';
import GraciasRegistroCliente from '../screens/GraciasRegistroCliente';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import Marcas from '../screens/Marcas';
import Consultas from '../screens/Consultas';
import CategoriasListado from '../screens/CategoriasListado';
import Buscar from '../screens/Buscar';
import MarcasListado from '../screens/MarcasListado';


export default createAppContainer(createSwitchNavigator( {
  AuthLoading: AuthLoadingScreen,
  
  ClienteApp: createStackNavigator({
    Marcas: Marcas,
    Consultas: Consultas,
    CategoriasListado: CategoriasListado,
    Buscar: Buscar,
    MarcasListado: MarcasListado,
    },{initialRouteName: 'Marcas'}),

  Auth: createStackNavigator({ 
      LoginCliente: LoginCliente,
      RegistroCliente: RegistroCliente,
      OlvideContrasenaCliente: OlvideContrasenaCliente,
      GraciasRegistroCliente: GraciasRegistroCliente
    },{
      initialRouteName: 'LoginCliente',
    })
},{
  initialRouteName: 'AuthLoading'
}));

