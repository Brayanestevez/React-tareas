import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //esto da alguna funciones para reutilizar
  const { signup, isAuthenticated, errors: RegisterError } = useAuth();
  const navigate = useNavigate();


  //cuando ingrese, estaes  la ruta
  useEffect(() => {
    if (isAuthenticated) navigate("/task");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    console.log(isAuthenticated);
    // console.log(values);
    //   registerRequest(values)
  });

  //para redirigir despues del login
  useEffect(( ) => {
    if (isAuthenticated) navigate("/tasks")
      },[isAuthenticated])
    

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
     
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {RegisterError.map((error, i) => (
        <div key={i} className="bg-red-600 text-white">
          {error}
        </div>
      ))}
        <h1 className="text-2xl font-bold py-4">Registro</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700
          text-white
          px-4
          py-2
          rounded-md
          my-2"
          placeholder="Nombre de usuario"
        />
        {errors.username && (
          <p className="text-red-600">Nombre de usuario es requerido</p>
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700
          text-white
          px-4
          py-2
          rounded-md
          my-2"
          placeholder="email"
        />
        {errors.email && <p className="text-red-600">Email es requerido</p>}
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700
          text-white
          px-4
          py-2
          rounded-md
          my-2"
          placeholder="Contraseña"
        />
        {errors.password && (
          <p className="text-red-600">Contraseña es requerida</p>
        )}

        <button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-1 my-4 rounded-md" type="submit">Registrar</button>
      </form>
      <p className="flex gap-x-2 justify-between my-4">
         Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-sky-500">Login</Link>
        </p>
    </div>
    </div>
  );

}

export default RegisterPage;
