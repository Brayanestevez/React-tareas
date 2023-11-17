import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
//para redirigir despues del login
  useEffect(() => {
if (isAuthenticated) navigate("/tasks")
  },[isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.map((error, i) => (
          <div key={i} className="bg-red-500 text-white text-center p-3 my-7 ">
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={onSubmit}>
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

          <button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-1 my-4 rounded-md" type="submit">Ingresar</button>
        </form>
        <p className="flex gap-x-2 justify-between my-4">
          No tienes una cuenta aun?{" "}
          <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
