//CRUD
import Task from "../models/task.model.js"; //se importa para hacer consultas en cada una de las funciones
export const getTasks = async (req, res) => {//OBTENER TODAS LAS TAREAS
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  //buscar todas las tareas, solo las tareas del usuario que este registrado en ese momento
  
  res.json(tasks); //recibir los task en json
};
//crear tarea
export const crateTask = async (req, res) => {
try {
  const { title, description, date } = req.body; //voy a recibir dentro de un req.body esta informacion
  console.log(req.body);
  const newTask = new Task({
    //se crea el objeto
    title,
    description,
    date,
    user: req.user.id//lo llamamos de validateToken, ya que guardamos alli el user
    //req.user, recibe siempre el id, en cada peticion, si el usuario esta logueado
  });
  const savedTask = await newTask.save(); //aca se guarda el objeto
  console.log(savedTask)
  res.json(savedTask);

} catch (error) {
  return res.status(500).json({ message: "errorororor" });
}
};


export const getTask = async (req, res) => {//OBTENER UNA SOLA TAREA
    try {
      // Este controlador busca una tarea específica en la base de datos.
  
    // Utiliza el ID de la tarea proporcionado en los parámetros de la solicitud (URL).
    // Por ejemplo, si la URL es "/tasks/123", req.params.id contendría "123".
    const task = await Task.findById(req.params.id).populate('user');

    // Verifica si se encontró la tarea en la base de datos.
    if (!task) {
        // Si no se encuentra, responde con un código de estado 404 (No encontrado)
         // y un mensaje JSON que indica que la tarea no se encontró.
         return res.status(404).json({ message: "Tarea no encontrada" });}

         // Si se encuentra la tarea, responde con un código de estado 200 (Éxito)
    // y envía la tarea en formato JSON como respuesta.
    res.json(task);
    } catch (error) {
         // y un mensaje JSON que indica que la tarea no se encontró.
         return res.status(404).json({ message: "Tarea no encontrada" });
    }
     
    
    };


export const deleteTask = async (req, res) => {//ELIMINAR LA TAREA
try {
  const task = await Task.findByIdAndDelete(req.params.id)
console.log("entroo")
if(!task)return res.status(404).json({ message: "Tarea no encontrada" })
return res.sendStatus(204);//conesto, significa que todo esta bien, pero no te voy a devolver nada
// res.json(task)
} catch (error) {
  return res.sendStatus(404).json({ message: "eroorrrr" });//conesto, significa que todo esta bien, pero no te voy a devolver nada
// res.json(task)
}
};


export const updateTask = async (req, res) => {//ACTUALIZAR LA TAREA
   try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true} )//new true, significa, que me muestre el dato nuevo, no el anterior
    if(!task)return res.status(404).json({ message: "Tarea no encontrada" })
    res.json(task)
   } catch (error) {
    return res.status(404).json({ message: "errrorororor" })
   }
};
