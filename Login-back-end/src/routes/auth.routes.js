//registro de usuario, para agregar un usuario a la bd
import Router from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewae.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";


const router = Router();//con esto ya se puede crear diversar rutas
// Crea un enrutador utilizando Express.
//peticiones post, get, put, delete, etc

router.post("/register", validateSchema(registerSchema), register);//cuando haga una peticion pos, vas ha ejecutar register
// Define una ruta POST para el registro de usuarios.
// Utiliza el middleware `validateSchema` para validar los datos del cuerpo de la solicitud
// según el esquema `registerSchema`.
// Cuando se recibe una solicitud POST en "/register", se ejecuta la función `register` del controlador.

router.post("/login", validateSchema(loginSchema), login);
// Define una ruta POST para el inicio de sesión de usuarios.
// Utiliza el esquema `loginSchema` para validar los datos del cuerpo de la solicitud.
// Cuando se recibe una solicitud POST en "/login", se ejecuta la función `login` del controlador.

router.post("/logout", logout);
// Define una ruta POST para cerrar la sesión (logout) de usuarios.
// Cuando se recibe una solicitud POST en "/logout", se ejecuta la función `logout` del controlador.

router.get("/verify", verifyToken);//verificar el token desde back

router.get("/profile", authRequired, profile);
// Define una ruta GET para obtener el perfil de un usuario.
// Utiliza el middleware `authRequired` para asegurarse de que el usuario esté autenticado.
// Cuando se recibe una solicitud GET en "/profile", se ejecuta la función `profile` del controlador.

export default router;
// Exporta el enrutador para que pueda ser utilizado por la aplicación principal.

