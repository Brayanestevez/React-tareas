//un modelo es decirle a mongo que tipos de datos estamso guardando
//modelo de usuarios que se van creando y guardando

import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,//limpiar los espacios en blanclo
    },
    email:{
        type: String,
        required: true,
        trim: true,//limpiar los espacios en blanclo
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true//registar la fecha cada que se haga un registro
})//esquema


const User = mongoose.model('User', UserSchema)//para decirle como va interactuar con la bd
export default User 

