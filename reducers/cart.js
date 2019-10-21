
let initialState = {
    cart: [],
    shippingInfo: {},
    timeSlots: []
}

const cart = (state = initialState, action) => {
    if(typeof state.cart == 'undefined'){
        state.cart = [];
    }
    switch (action.type) {

        case 'CLEAR_CART':
            return { 
                shippingInfo: state.shippingInfo,
                cart: [],
                timeSlots: state.timeSlots
            };
        break;

        case 'ADD_TIME_SLOTS':
            return { 
                shippingInfo: state.shippingInfo,
                cart: state.cart,
                timeSlots: action.payload
            };
        break;

        case 'ADD_SHIPPING_INFO':
            return { 
                shippingInfo: action.payload,
                cart: state.cart,
                timeSlots: state.timeSlots
            };
        break;

        case 'DELETE_ITEM':
            let cartToDeleteItem = state.cart;
            console.log(action.payload.id, cartToDeleteItem);
            for (let index = 0; index < cartToDeleteItem.length; index++) {
                const item = cartToDeleteItem[index];
                if(typeof item.id !== 'undefined'){
                    if(action.payload.id == index){
                        cartToDeleteItem.splice(index, 1);
                    }
                }
            }
            return { 
                cart: cartToDeleteItem,
                shippingInfo: state.shippingInfo,
                timeSlots: state.timeSlots
            };
            break;    
        case 'UPDATE_QTY':
            
            let cartToUpdate = state.cart;
            for (let index = 0; index < cartToUpdate.length; index++) {
                const item = cartToUpdate[index];
                if(
                    typeof item.id !== 'undefined' && 
                    typeof action.payload.cantidad !== 'undefined' &&
                    typeof action.payload.id !== 'undefined' &&
                    typeof item.cantidad !== 'undefined'
                ){
                    if(action.payload.id == item.id){
                        item.cantidad = action.payload.cantidad;
                    }
                }
            }
            //console.log("UUUUUUUUUUUUUU", cartToUpdate);
            return { 
                cart: cartToUpdate,
                shippingInfo: state.shippingInfo,
                timeSlots: state.timeSlots
            };
            break;
        case 'ADD_TO_CART':
            
            let newCart = state.cart;
            if(newCart.length == 0){
                newCart.push(action.payload);
            }else{
                let found = false;
                for (let index = 0; index < newCart.length; index++) {
                    const item = newCart[index];
                    if(
                        typeof item.id !== 'undefined' && 
                        typeof action.payload.cantidad !== 'undefined' &&
                        typeof action.payload.id !== 'undefined' &&
                        typeof item.cantidad !== 'undefined'
                    ){
                        if(action.payload.id == item.id){
                            found = true;
                            let nuevaCantidad = parseInt(action.payload.cantidad) + parseInt(item.cantidad);
                            item.cantidad = nuevaCantidad;
                            newCart[index] = item;
                        }
                    }
                }
                if(!found){
                    newCart.push(action.payload);
                }
            }
            return { 
                cart: newCart,
                shippingInfo: state.shippingInfo,
                timeSlots: state.timeSlots
            };
            break;
        default:
            return state;
            break;
    }
    return state;
};

export default cart