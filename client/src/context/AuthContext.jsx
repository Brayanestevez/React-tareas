//contexto que gusrda los datos de autenticacion del usuario
//es un componente que va englobar todo y va compartir los datos en todos los componentes hijos

import { createContext, useContext, useState, useEffect } from "react";
import { LoginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie"; //para traer las cookies de el back desde el front

export const AuthContext = createContext();

//esto sirve, que solo con importar useAuth, importe todo lo de autContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deberia estar dentro de un provider "); //si no esta, mande un error

  return context; //si no, retornar el contexto ya creado
};

//provider, componente que va englobar a otros

export const AuthProvider = (
  { children } //AutProvider recibe un elemento hijo
) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); //para autenticar el usuario
  //   const [errors, setErrors] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);//loading, crear un estado de carga cuando se pidan los datos

  const signup = async (user) => {
    //se va  necesitar los datos de un usuario  para autenticarse
    try {
      //funcion signup es la que va recibir los datos del usuario, va hacer la peticion
      const res = await registerRequest(user); //enviar los datos al bakend, va recibir la respuesta
      console.log(res.data); //estos datos que esta recibiendo, se guardan en la const user de useState
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      //   console.log(error.response);
      setErrors(error.response.data); //cuando  halla errores, que se visualice el error
    }
  };
  const signin = async (user) => {
    //se va  necesitar los datos de un usuario  para autenticarse
    try {
      const res = await LoginRequest(user); //te paso el usuartio desde auth.js
      console.log(res);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        //este if es para arreglar el error del .map is not function
        return setErrors(error.response.data);
      }
      // console.log("este es el erorr".error.response.data)
      setErrors([error.response.data.message]); //esto es para convertir el error en un array
      // console.log(error.response.data);
    }
  };
  //que se quiten los mensajes de erro despues de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        //empieza a contar desde los 5 segundos
        setErrors([]); //y luego muestra un array vacio
      }, 5000);
      return () => clearTimeout(timer); //esto es para quitar el time, si cambia el usuario de pagina, se elimina el time
    }
  }, [errors]);

  const Logout = () => {//se borran los cookies, para cuando seleccione logout
Cookies.remove("token");
setIsAuthenticated(false)
setUser(null)
  }
  //si carga la aplicacion al inicio, hacemos una peticion al back-end
  useEffect(() => {
    async function checkLogin() {
      //esta funcion se ejecuta, apenas cargue la pagina
      const cookies = Cookies.get(); //obtener todos los valores de cookies del back-end, quiero que leas las cookies
             //si la cookie esta en en la variable token, si existe, pueda pedir datos al back-end
      if (!cookies.token) {//comprobar si no hay token
 
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
        try {
          //si hay un token, envialo al back-end y me tiene que responder algo
          const res = await verifyTokenRequest(cookies.token);
         
          console.log(res)
          if (!res.data) {//si no me responde nada
            //si no se recibio una respuesta del back-end
             setIsAuthenticated(false); //la autrenticacion es false, envia a false
             setLoading(false);//no esta cargando y termina de responder
            return;
          }//pero  si responde
            setIsAuthenticated(true)//el user autenticado es true
            setUser(res.data)//muestrame el user y guardalo en el estado
            setLoading(false);//termina de cargar
          
        } catch (error) {//si dio error
          console.log(error)
          setIsAuthenticated(false);//el user autenticado es false
          setUser(null);//el usuario es null
          setLoading(false); //termina de cargar
      }
    }
    checkLogin();
  }, []);

 
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        Logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {/*se colcan adentro los valores que se quieren exportar luego*/}
      {children}
    </AuthContext.Provider>
  );
};
