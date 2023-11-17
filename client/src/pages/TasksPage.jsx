import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    //apenas cargue este componente, se va ejecutar Gettask
    getTasks();
  }, []);
  //   return(
  //     <div>
  //       {/*ca es donde lo  recorremos*/}
  //       {tasks.map((task) => {
  //         <div key={task._id}>
  //           <h1>{task.title}</h1>
  //           <p>{task.description}</p>
  //         </div>;
  //       })}
  //     </div>
  //   );
  // }
  if (tasks.length === 0) return <h1>No hay tareas</h1>;
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-3   gap-1">
      {tasks.map((task) => (
       // Renderiza el componente TaskCard con los datos de la tarea y una clave única
<TaskCard task={task} key={task._id}></TaskCard>


        // <div key={task._id}>
        //   <h1>{task.title}</h1>
        //   <p>{task.description}</p>
        //   </div>
      ))}
    </div>
  );
}
export default TasksPage;
