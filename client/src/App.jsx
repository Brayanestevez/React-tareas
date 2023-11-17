import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage.jsx";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from './context/TaskContext'; // Asegúrate de poner la ruta correcta hacia TaskProvider
import TaskPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        
        <BrowserRouter>
       <main className="container mx-auto px-10">

       <Navbar/>
          <Routes>
            {/* Ruta para la página de inicio */}
            <Route path="/" element={<HomePage />} />

            {/* Rutas para otras páginas */}
            <Route path="/login" element={<LoginPage />} />
            {/* pagina de registro  */}
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              {/* las rutas que estan abajo, son para usuarios logueados */}
              {/* pagina de tareas  */}
              <Route path="/tasks" element={<TaskPage />} />

              {/* nueva tarea  */}
              <Route path="/add-task" element={<TaskFormPage />} />

              {/* actualizar los dos puntos significa un parametro dinamico  */}
              <Route path="/tasks/:id" element={<TaskFormPage />} />

              {/* Ruta para el perfil del usuario */}
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
       </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
