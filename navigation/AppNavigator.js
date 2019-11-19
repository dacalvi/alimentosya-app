import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import LoginCliente from '../screens/LoginCliente';
import RegistroCliente from '../screens/RegistroCliente';
import OlvideContrasenaCliente from '../screens/OlvideContrasenaCliente';
import GraciasRegistroCliente from '../screens/GraciasRegistroCliente';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ProductosPorMarca from '../screens/ProductosPorMarca';
import Marcas from '../screens/Marcas';
import Consultas from '../screens/Consultas';
import CategoriasListado from '../screens/CategoriasListado';
import Buscar from '../screens/Buscar';
import MarcasListado from '../screens/MarcasListado';
import ResultadoBusqueda from '../screens/ResultadoBusqueda';
import Carrito from '../screens/Carrito';
import Gracias from '../screens/Gracias';
import MedioDePagoMercadoPago from '../screens/MedioDePagoMercadoPago';
import SeleccionarMedioPago from '../screens/SeleccionarMedioPago';
import Horarios from '../screens/Horarios';
import DatosEnvio from '../screens/DatosEnvio';
import Getphone from '../screens/Getphone';


export default createAppContainer(createSwitchNavigator( {
  AuthLoading: AuthLoadingScreen,
  
  ClienteApp: createStackNavigator({
    Marcas: Marcas,
    Consultas: Consultas,
    CategoriasListado: CategoriasListado,
    Buscar: Buscar,
    MarcasListado: MarcasListado,
    ProductosPorMarca: ProductosPorMarca,
    ResultadoBusqueda: ResultadoBusqueda,
    Gracias: Gracias,
    Carrito: Carrito,
    MedioDePagoMercadoPago: MedioDePagoMercadoPago,
    SeleccionarMedioPago: SeleccionarMedioPago,
    Horarios: Horarios,
    DatosEnvio: DatosEnvio,
    LoginCliente: LoginCliente,
    RegistroCliente: RegistroCliente,
    OlvideContrasenaCliente: OlvideContrasenaCliente,
    Getphone: Getphone
    
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
  initialRouteName: 'ClienteApp'
}));

