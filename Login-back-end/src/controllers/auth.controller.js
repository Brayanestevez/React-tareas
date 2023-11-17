//este archivo va permitir registrar peticiones, una login y otra register
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { CreateAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //CREAR REGISTRO
  const { email, password, username } = req.body; //va estar extrallendo los datos que le envien, como email, password y username.

  try {
    //validacion de usuario,si  encuentra un email igual, enviael mensaje y nodeja accerder
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["correo ya esta en uso"]);

    const hash = await bcryptjs.hash(password, 10); //para encriptar la contraseña

    const newUser = new User({
      username,
      email,
      password: hash, //lo igualamos con el hash
    });

    const userSaved = await newUser.save(); //es asincrono, se guarda de una,SE GUARDA eL USUARIO
    // res.send("registrandooo"); //va responder un texto register
    console.log("datos enviados");

    const token = await CreateAccessToken({ id: userSaved.id }); //se crea el token
    res.cookie("token", token, {
      //  las propiedades que estan comentadas, solo se usan si el navegador no muestra las Cookies, si esta mal en algo
      // sameSite: 'none',
      // secure: true,
      // httpOnly: false
    }); //se guarda, se establece en una cookie la respuesta

    res.json({
      //se envia la respuesta
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAT: userSaved.createdAt,
      updatedAT: userSaved.createdAt,
    }); //los envia al front en formato json
  } catch (error) {
    res.status(500).json({ Message: error.Message });
  }
};

export const login = async (req, res) => {
  //LIGIN ACCEDER
  const { email, password } = req.body; //va estar extrallendo los datos que le envien, como email, password y username.

  try {
    const userFound = await User.findOne({ email }); //voy a buscar un usuario, si el usuario tiene un correo, ejecute esto

    if (!userFound)
      return res.status(400).json({ message: "no se encuentra el usuario" }); // si no encontro el usuario, muestra este mensaje.
    //y si, si lo encontro, ejecuta esto
    const isMath = await bcryptjs.compare(password, userFound.password); //compare, compara si ya esta en la bd

    if (!isMath) return res.status(404).json({ message: "contraseña erronea" });

    // const newUser = new User({
    //   username,
    //   email,
    //   password: siMath, //lo igualamos con el hash
    // });

    // const userSaved = await newUser.save(); //es asincrono, se guarda de una,SE GUARDA eL USUARIO
    // res.send("registrandooo"); //va responder un texto register
    // console.log("datos enviados");

    const token = await CreateAccessToken({ id: userFound._id }); //del usuario encontrado, crea un token
    res.cookie("token", token); //se guarda, se establece en una cookie la respuesta

    res.json({
      //se envia la respuesta
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAT: userFound.createdAt,
      updatedAT: userFound.createdAt,
    }); //los envia al front en formato json
  } catch (error) {
    res.status(500).json({ Message: error.Message });
  }
};
//logout, cuando digo cerrar secion, el cookie, desaparece
export const logout = (req, res) => {
  //DESLOGUEARSE
  res.cookie("token", "", {
    //desde res queremos eliminar algo, con el metodo llamado cookie ("token")
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  //ACCEDER
  // Busca el usuario por su ID en la base de datos
  const userFound = await User.findById(req.user.id); // Realiza una consulta a la base de datos para encontrar al usuario por su ID

  // Verifica si se encontró al usuario
  if (!userFound)
    // Si no se encuentra al usuario, envía una respuesta de error
    return res.status(400).json({ Message: "Usuario no encontrado" });
  return res.json({
    //pero si encontro algo, me muestra este objeto
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAT: userFound.createdAt,
    updatedAT: userFound.createdAt,
  });

  // Si se encuentra al usuario, responde con los datos del perfil del usuario
  //res.send("profile"); // La respuesta que se envía después de la solicitud GET
};

//si el usuario ya trajo el token, el usuario deberia mostrarlo por jwt
// Importa el módulo jwt para trabajar con tokens JWT y el modelo de usuario (presumiblemente de una base de datos).

// Define la función verify como una función asíncrona que toma los objetos req (solicitud) y res (respuesta).
export const verifyToken = async (req, res) => {
  // Extrae el token del objeto req.cookies.
  const { token } = req.cookies;

  // Si no hay un token, responde con un estado 401 (no autorizado) y un mensaje.
  if (!token) return res.status(401).json({ message: "No está autorizado" });

  // Utiliza el método verify del módulo jwt para verificar el token con la clave secreta TOKEN_SECRET.
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    // Si hay un error en la verificación del token, responde con un estado 401 y un mensaje.
    if (err) return res.status(401).json({ message: "No está autorizado" });

    // Busca al usuario en la base de datos utilizando el id almacenado en el token.
    const userFound = await User.findById(user.id);

    // Si no se encuentra al usuario, responde con un estado 401 y un mensaje.
    if (!userFound)
      return res.status(401).json({ message: "No está autorizado" });
    // Si el usuario se encuentra, devuelve la información del usuario en la respuesta JSON.
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
