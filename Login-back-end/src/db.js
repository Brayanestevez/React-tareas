import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost/mernDB');
//     console.log("Conexión exitosa a la base de datos.");
//   } catch (error) {
//     console.log("No se pudo conectar:", error.message);
//   }
// }
// const mongoose = require('mongoose');
const PortDB = "27017";
const ServerDB = "127.0.0.1";
const DataBase = "BDprueba";
 
export default mongoose
    .connect(`mongodb://${ServerDB}:${PortDB}/${DataBase}`)
    .then(db => console.log('📙 Connect DB'))
    .catch(err => console.log(err));
 
// module.exports = mongoose;