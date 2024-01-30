import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const isAdmin = true;

function CrearNuevoEjercicio() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && isAdmin ? (
        <>
          <h1>Crear Nuevo Ejercicio</h1>
        </>
      ) : (
        <>
          <h2>¡Lo siento! No tienes los permisos necesarios para estar aquí</h2>
        </>
      )}
    </div>
  );
}

export default CrearNuevoEjercicio;