import { combineReducers } from 'redux';
import login from './login';
import home from './home';
import register from './register';
import serviceRequest from './serviceRequest';
import adherirCategoria from './adherirCategoria';
import cart from './cart';

export default combineReducers({
    login,
    home,
    register,
    serviceRequest,
    adherirCategoria,
    cart
});

