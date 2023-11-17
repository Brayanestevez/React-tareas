import React from "react";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc)

// 

function TaskCard({ task }) {
  const {deleteTask} = useTasks();
  return (
    <div className="bg-zinc-950 max-w-md w-full p-10 rounded-md ">
    <header className="flex justify-between">
      <h1 className="text-2xl font-bold truncate">{task.title}</h1>
    </header>
    <p className="text-slate-300 overflow-x-hidden">{task.description}</p>
    <p className="truncate">{days(task.date).utc().format('DD/MM/YYYY')}</p>
    <div className="flex flex-row gap-x-2 items-center">
      <button className="bg-red-500 hover:bg-red-900 text-white px-4 py-1 my-4 rounded-md" onClick={()=>{
          deleteTask(task._id);
        }}>Eliminar</button>
      <Link className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-1 my-4 rounded-md"  to={`/tasks/${task._id}`}>Editar</Link>
    </div>
  </div>
  
  );
}

export default TaskCard;
