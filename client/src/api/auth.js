// import axios from "axios"; que no importe desde el axios nosmal, si no el axios que se hizo en concreto
import axios from "./axios";

// Definición de la URL base de la API
const API = "http://localhost:3000/api";

// Definición de una función para realizar una solicitud POST de registro
//export const registerRequest = async user => await axios.post(`${API}/register`, user);//se crea una const registerRequest, que luego va pasar por user y va hacer una peticion axios post
export const registerRequest = async (user) =>
  await axios.post(`/register`, user);
// Comentario: Este código importa Axios, define la URL base de la API, y crea una función llamada registerRequest para realizar solicitudes POST de registro a la API.

// export const LoginRequest = user => axios.post(`${API}/login`, user)  //va recibir un usuario a la ubicacion post con erl  user que esta ingresando
export const LoginRequest = (user) => axios.post(`/login`, user);

//verificar token, va hacer una peticion get a /auth/verify-token
export const verifyTokenRequest = async () => await axios.get(`/verify`);


