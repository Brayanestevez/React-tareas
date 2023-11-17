import React from "react";
import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, getTaskRequest, deleteTaskRequest, updateTaskRequest } from "../api/task";


const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext); //

  if (!context) throw new Error("useAuth deberia estar dentro de un provider ");
  return context;
};

export function TaskProvider({ children }) {
    //este useSttate es para hacer el recorrido 
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
   try {
     //va hacer unapeticion al back-end
     const res = await getTasksRequest();
     console.log(res)
    
     setTasks(res.data)//esto es para  recorrerlo en la pagina principál de tasks
   } catch (error) {
    console.error(error);
   }
  };
  //funcion para guardar tareas en la bd
  const createTask = async (task) => {
    //cuando se crea una tarea
    const res = await createTaskRequest(task); //se ejecuta
    console.log(res);
  };
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if(res.status === 204) setTasks(tasks.filter((task) => task._id !== id)) //si la respuesta es estatus 204, de las tareas voy a filtrar(si de cada tarea de _id es distinta a id) entonces conservalo
      //if(res.status === 200)  setTasks(tasks.filter(task => String(task._id) !== String(id)))

    } catch (error) {
      console.log(error)
    }
  };
  const getTask = async (id) =>{
try {
  const res = await getTaskRequest(id);
return res.data;
} catch (error) {
  console.error(error)
}

  }

  const updateTask = async (id, task) => {// id para buscar los valores que se van actualizar y task para añadir a los nuevos valores que se edito
try {
  await updateTaskRequest(id, task)
} catch (error) {
  console.error(error);
}
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        getTask, 
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
