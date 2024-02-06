import { Link } from "react-router-dom";
import "./ExerciseCard.css";

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
        <Link to={`/exercises/${id_exercise}`} className="exercise-link">
          <h3 className="exercise-nombre">{name}</h3>
          <p className="exercise-foto">{photo}</p>
          <p className="exercise-descripcion">{description}</p>
          <p className="exercise-tipologia">{typology}</p>
          <p className="exercise-grupo-muscular">{muscle_group}</p>
          <p className="exercise-equipo">{equipment}</p>
        </Link>
      </div>
    </div>
  );
}

export default ExerciseCard;
