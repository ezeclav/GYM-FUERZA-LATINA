import { Link } from "react-router-dom";
import "./ExerciseCard.css";
import { AuthContext } from "../../../context/AuthContext";
import LikeToggle from "../../Favorites/LikeToggle/index";
const defaultExercise = "https://placehold.co/90x90.png";
function ExerciseCard({ id, name, typology, muscle_group, equipment, photos }) {
  // console.log(ExerciseCard);
  return (
    <div className="exercise-list-card">
      <div className="exercise-details">
        <Link to={`/exercise/${id}`} className="exercise-link">
          <h3 className="exercise-nombre">{name}</h3>
          <img src={defaultExercise}></img>
          <p className="exercise-tipologia">{typology}</p>
          <p className="exercise-grupo-muscular">{muscle_group}</p>
          <p className="exercise-equipo">{equipment}</p>
        </Link>
      </div>
      <LikeToggle exerciseId={id} />
    </div>
  );
}

export default ExerciseCard;
