//los midelwares, son funcionesque se ejecutan antes de llegar a una ruta

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const authRequired = (req, res, next) => {
  // req me da informacion para la peticion, res, me da metodos para enviar a una respuesta y next, en ves de darmne una respuesta, continua()si hay un token, continua
  // const token = req.headers.cookie//aca llamo al cookie
  const { token }= req.cookies; //aca llamo al cookie, de otra manera, para esto se necesita descargar nmp i cookie-parser para poder leerlo
  // console.log(token)//qwuiero ver en consola el cookie

  if (!token)
    return res.status(401).json({ mesage: "no  token, autorizartion denied" }); //si no hay token, manda un mensaje

  // Verifica la validez del token JWT
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    // console.log(user)
    // Si hay un error en la verificación del token
    if (err)
      // Envía una respuesta de error indicando que el token es inválido (código 403)
      return res.status(403).json({ message: "Tokoen inválid" });

    // Si el token es válido, imprime la información del usuario en la consola
   
    req.user = user;//guardamos user, por dentro tiene el id
    // console.log(user);
    next(); // Permite que la solicitud continúe al siguiente middleware o controlador
  });
};
