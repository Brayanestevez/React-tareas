import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()
app.use(cors({
    origin: 'http://localhost:5173',//solo conectar con este puerto
    credentials: true//para que tambien pueda traer o establecer los cookies aqui
}));//no tener limitaciones con cors
app.use(morgan('dev'));//para ver las peticiones que hace el servidor
app.use(express.json());//para que pueda convertir los reques body en formato json
app.use(cookieParser());//para convertir los cookies en formato json

app.use('/api', taskRoutes )
app.use('/api',authRoutes);
export default app

