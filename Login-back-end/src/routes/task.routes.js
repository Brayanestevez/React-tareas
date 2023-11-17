//rutas de tareas, para el crud

import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  crateTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/thask.controller.js";
import { validateSchema } from "../middlewares/validator.middlewae.js";
import { crateTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks); //obtener todas las tareas
router.get("/tasks/:id", authRequired, getTask); //obtener una sola
router.post("/tasks", authRequired, validateSchema(crateTaskSchema), crateTask); //paraF crear tareas
router.delete("/tasks/:id", authRequired, deleteTask); //para eliminar uno solo
router.put("/tasks/:id", authRequired, updateTask); //para actualizar uno solo

export default router;
