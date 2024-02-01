import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import NewExercisePage from "../../pages/NewExercise/NewExercise"

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          // Usuario Logueado
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="user/profile">Perfil de usuario</Link>
            </li>
            <li onClick={NewExercisePage}>
              <Link to="/NewExercise">Crear Nuevo Ejercicio</Link>
            </li>
            <li onClick={logout}>
              <Link to="/">Salir</Link>
            </li>
          </>
        ) : (
          // Usuario No Logueado
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth/login">Ingresar</Link>
            </li>
            <li>
              <Link to="/auth/register">Registrarse</Link>
            </li>
            <li onClick={NewExercisePage}>
              <Link to="/NewExercise">Crear Nuevo Ejercicio</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
