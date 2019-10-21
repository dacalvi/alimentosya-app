import { AsyncStorage } from 'react-native';
import { isSignedIn } from './auth';
import { API_URL } from './config';

export default class RestApi {

  handleErrors(response) {
    console.log(response);
    if (!response.ok) {
        //throw Error(response.statusText);
    }
    return response;
  }

  post(endpoint, params){
    return new Promise((resolve, reject)=>{
      let headers = {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      };
      isSignedIn().then((token) => {
        headers['Authorization'] = token;
        resolve(fetch( endpoint , {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(params),
          })
        );
      }).catch((error)=>{
        resolve(fetch( endpoint , {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(params)
          }));
      });
    });
  }  

  get(endpoint){
    return new Promise((resolve, reject)=>{
      let headers = {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      };

      isSignedIn().then((token) => {
        headers['Authorization'] = token;
        resolve(fetch( endpoint , {
          method: 'GET',
          headers: headers,
          withCredentials: true,
          credentials: 'include'
        }));

        
      }).catch((error)=>{
        resolve(fetch( endpoint , {
          method: 'GET',
          headers: headers
        }));
      });
    });
  }

  olvideContrasenaCliente(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'auth/forgotpassword', params);
      api
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson);
        responseJson = JSON.parse(responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson.status);
        }
      })
      .catch((error) => {
        console.log(error);
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  marcas(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'marcas');
      api
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  shippingtime(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'shippingtime');
      api
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  pagodirecto(params){
    console.log(params);
    return new Promise((resolve, reject)=>{
      let api = this.post( API_URL + 'pago/directo', params);
      api
      //.then((response) => response.json())
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson);
        responseJson = JSON.parse(responseJson);
        if(responseJson.error){
          console.log(responseJson);
          reject(responseJson);          
        }else{
          console.log(responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error.error);
      });
    });
  }

  pagomercadopago(params){
    console.log(params);
    return new Promise((resolve, reject)=>{
      let api = this.post( API_URL + 'pago/mercadopago', params);
      api
      //.then((response) => response.json())
      .then((response)=>response.text())
      .then((responseJson) => {
        console.log(responseJson);
        responseJson = JSON.parse(responseJson);
        if(responseJson.error){
          console.log(responseJson);
          reject(responseJson);          
        }else{
          console.log(responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error.error);
      });
    });
  }

  productos(params){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'productos/marca/' + params);
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  consultar(params){
    return new Promise((resolve, reject)=>{
      let api = this.post( API_URL + 'consultas', params);
      api
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          console.log(responseJson);
          reject(responseJson);          
        }else{
          console.log(responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error.error);
      });
    });
  }

  buscar(params){
    return new Promise((resolve, reject)=>{
      let api = this.post( API_URL + 'buscar', params);
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          console.log(responseJson);
          reject(responseJson);          
        }else{
          console.log(responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error.error);
      });
    });
  }

  registerProfesional(params){
    return new Promise((resolve, reject)=>{
      let api = this.post( API_URL + 'register/profesional', params);
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error.error);
      });
    });
  }

  registerCliente(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'register/cliente', params);
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(params , responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log(params, error);
        reject(error.error);
      });
    });
  }

  
  login(params){
    console.log(params);
    return new Promise((resolve, reject) => {
      let api = this.post(API_URL + 'auth/login', params);
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          if(responseJson.token && responseJson.token != ''){
            //Save token to store
            AsyncStorage.multiSet([
              ['token', responseJson.token]
            ], ()=> {
              resolve(responseJson);
            });
            //this.registerForPushNotificationsAsync();
          }else{
            resolve(responseJson);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  categorias(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'categorias');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  miscategorias(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'categorias/mias');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  serviceRequest(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'servicerequest', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error);
        reject(error.error);
      });
    });
  }


  adherirCateogoria(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'adherircategoria', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error);
        reject(error.error);
      });
    });
  }

  disponibilidad(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'disponibilidad', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error, params);
        reject(error.error);
      });
    });
  }

  ofertas(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'ofertas');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  postular(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'ofertas', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error, params);
        reject(error.error);
      });
    });
  }

  requestedServices(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'requestedservices');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  cancelServiceRequest(id){
    return new Promise((resolve, reject)=>{
      let params = {"solicitud_id": id};
      let api = this.post(API_URL + 'servicerequest/cancel', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error, params);
        reject(error.error);
      });
    });
  }

  aceptarPostulacion(solicitud_id, prestador, postulacion_id, monto){
    return new Promise((resolve, reject)=>{
      let params = {
        "solicitud_id": solicitud_id, 
        "prestador_seleccionado": prestador,
        "postulacion_aceptada_id": postulacion_id,
        "monto": monto
      };
      let api = this.post(API_URL + 'postulaciones/aceptar', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error, params);
        reject(error.error);
      });
    });
  }

  postulaciones(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'postulaciones');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  cancelarPostulacion(id){
    let params = {"postulacion_id": id};
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'postulaciones/cancelar', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error, params);
        reject(error.error);
      });
    });
  }

  enprocesocliente(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'enproceso');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  terminartrabajo(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'finishservice', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        console.log("service request catch", error, params);
        reject(error.error);
      });
    });
  }

  trabajosterminados(params){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'finishedservices');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
  

};