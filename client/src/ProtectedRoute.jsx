import React, { useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate , Outlet} from 'react-router-dom'//outlet es como decir, el componente esta adentro
//nos va poder validar si hay valores en el navegador, para que continue
//va validar el cookie 
function ProtectedRoute() {
 const {loading, isAuthenticated} =useAuth();
 console.log(loading, isAuthenticated)

if(loading)
return <h1>caegandoi.......////////////////////////////////.</h1>

 //primero saber si el usuario existe o no, por lo tanto si el usuario npo esta autenticado lo vamos a redireccionar al login
 if(!loading && !isAuthenticated) return <Navigate to= '/login' replace/>//replace, para que no vuelva a la ruta anterior
  return (
    //necesito saber si el usuario esta autenticado / consultando la cookie, lo podemos saber
    <Outlet/>
  )
}

export default ProtectedRoute;