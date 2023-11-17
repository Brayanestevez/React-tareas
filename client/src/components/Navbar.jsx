import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { isAuthenticated, Logout, user } = useAuth();

  return (
    <div className="bg-zinc-800 my-3 flex justify-between py-5 px-10">
      <Link to={
        isAuthenticated ? "/tasks" : "/"
      }>
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido <strong>{user?.username}</strong>
            </li>
            <li>
              <Link to={"/add-task"}> Nueva Tarea </Link>
            </li>
            <li>
              <Link
                to={"/"}
                onClick={() => {
                  Logout();
                }}
                className="bg-indigo-700 px-4 py-1 rounded-lg"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={"/login"}
                className="bg-indigo-700 px-4 py-1 rounded-lg"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={"/register"}
                className="bg-indigo-700 px-4 py-1 rounded-lg"
              >
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
