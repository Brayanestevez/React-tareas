import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm(); // de useForm vas ha importar register y handleSubmit
  const { createTask, getTask, updateTask } = useTasks(); //me vas a traer las tareas que vienen desde alli
  const navigate = useNavigate();
  const params = useParams();

  //para editar las task
  //cada ves que se carga la aplicacion, se deberia ver el objeto
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id); //que es el id de la tarea que quiero consultar
        setValue("title", task.title); //para traer los datos
        setValue("description", task.description); //para traer los datos
        // setValue(
        //   "date",
        //   task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        // );
        // setValue("completed", task.completed);
      }
    }

    loadTask();
  }, []);
  // console.log(createTask())
  const onSubmit = handleSubmit((data) => {
    //se coloca un data, para recibir los datos

    if (params.id) {
      //si se accede a los parametro de id existe es que estas creando la task

      updateTask(params.id, { ...data  });
    } else {
      createTask({ ...data, date: dayjs.utc(data.date).format() }); //para crear la tarea
    }
    navigate("/tasks"); //y si no, va estar editando
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          placeholder="titulo"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("title")}
          autoFocus
        />
        <label htmlFor="description">descripción</label>
        <textarea
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          rows="6"
          placeholder="Descripción"
          {...register("description")}
        ></textarea>
        <label htmlFor="date">Dia</label>
        <input
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md"
          type="date"
          name="date"
          {...register("date")}
        />
        <button
          className="bg-indigo-500 px-3 py-1 mx-2 my-4 end-4 rounded-md"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </div>
    </div>
  );
}

export default TaskFormPage;
