import { Link } from "react-router-dom";
import "./ExerciseCard.css";
import { AuthContext } from "../../../context/AuthContext";

//const admin = useContext(AuthContext);

function ExerciseCard({
  id_exercise,
  name,
  description,
  photo,
  typology,
  muscle_group,
  equipment,
}) {
  return (
    <div className="exercise-list-card">
      <div className="exercise-details">
        <Link to={`/exercises/${id}`} className="exercise-link">
          <h3 className="exercise-nombre">{nombre}</h3>
          <p className="exercise-foto">{foto}</p>
          <p className="exercise-descripcion">{descripcion}</p>
          <p className="exercise-tipologia">{tipologia}</p>  
          <p className="exercise-grupo-muscular">{grupoMuscular}</p> 
          <p className="exercise-equipo">{equipo}</p>     
          if (admin) {
            <Link to={`/modifExercise/:exerciseId`} className="edit-link">Editar</Link>}         
        </Link>
      </div>
    </div>
  );
}

export default ExerciseCard;
