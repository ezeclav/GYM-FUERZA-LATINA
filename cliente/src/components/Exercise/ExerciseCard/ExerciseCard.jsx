import { Link } from "react-router-dom";
import "./ExerciseCard.css";
import { AuthContext } from "../../../context/AuthContext";
import LikeToggle from "../../Favorites/LikeToggle/index";
import { useState, useEffect } from "react";
const defaultExercise = "https://placehold.co/90x90.png";

function ExerciseCard({ id, name, typology, muscle_group, equipment, photo }) {
  const [fotoExercise, setFotoExercise] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");

        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(`/api/exercise/${id}`, options);
        setFotoExercise(response.data.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchExercises();
  }, [id]);

  return (
    <div className="exercise-list-card">
      <div className="exercise-details">
        <Link to={`/exercise/${id}`} className="exercise-link">
          <h3 className="exercise-nombre">{name}</h3>
          <img src={photo ? "" : defaultExercise}></img>
          <p className="exercise-tipologia">
            <span className="underline">Tipología:</span>&nbsp; {typology}
          </p>
          <p className="exercise-grupo-muscular">
            <span className="underline">Grupo Muscular:</span>&nbsp;{" "}
            {muscle_group}
          </p>
          <p className="exercise-equipo">
            <span className="underline">Equipamiento:</span>&nbsp; {equipment}
          </p>
        </Link>
      </div>
      <LikeToggle exerciseId={id} />
    </div>
  );
}

export default ExerciseCard;
