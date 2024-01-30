import { Link } from "react-router-dom";
import "./ExerciseCard.css";

function ExerciseCard({ nombre, descripcion, foto, tipologia, grupoMuscular, equipo }) {
  return (
    <div className="entry-list-card">
      <div className="entry-details">
        <Link to={`/exercises/${id}`} className="exercise-link">
          <h3 className="exercise-nombre">{nombre}</h3>
          <p className="exercise-foto">{foto}</p>
          <p className="exercise-descripcion">{descripcion}</p>
          <p className="exercise-tipologia">{tipologia}</p>  
          <p className="exercise-grupo-muscular">{grupoMuscular}</p> 
          <p className="exercise-equipo">{equipo}</p>         
        </Link>
      </div>
    </div>
  );
}

export default ExerciseCard;
