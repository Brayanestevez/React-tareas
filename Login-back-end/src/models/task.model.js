//definir las tareas que se van guardando

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
        // Define un campo llamado "user".
        // Se utiliza para asignar una tarea a un usuario específico.
        type: mongoose.Schema.Types.ObjectId, 
        // El tipo de datos del campo es un ObjectId, que es un identificador único en MongoDB.
        ref: 'User',
        required: true 
        // El campo es obligatorio en cada documento y no puede estar vacío.
      }
      
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
