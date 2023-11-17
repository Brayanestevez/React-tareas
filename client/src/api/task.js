import axios from "./axios";

//cuando un usuario me envie una tarea por metodo post OBTENER TODAS LAS TAREAS, VISUALIZARLAS TODAS
export const getTasksRequest = async () => axios.get('/tasks');
//bara buscar una tarea, con el id, OBTENER UNA TAREA
export const getTaskRequest = async (id) => await axios.get(`/tasks/${id}`);
//crear una tarea
export const createTaskRequest = async (task) => axios.post('/tasks', task);
//actualizar la tarea, por medio del id y va estar actualizando la tarea
export const updateTaskRequest = async (id, task) => await axios.put(`/tasks/${id}`, task);
//eliminar tareas por medio del id
export const deleteTaskRequest = async (id) => await axios.delete(`/tasks/${id}`)

