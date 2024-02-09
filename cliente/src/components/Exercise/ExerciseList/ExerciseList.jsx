import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import SearchBar from "../../SearchBar";
import "./ExerciseList.css";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");

        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get("/api/exercises", options);

        const reversedExercises = response.data.data.reverse();
        console.log(response.data.data);
        setExercises(reversedExercises);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  let result;

  const searchHandler = (e) => {
    const searchString = e.target.value;
    searchString.length > 1
      ? setSearchKeyword(searchString)
      : setSearchKeyword("");
  };

  if (searchKeyword !== "") {
    result =
      exercises &&
      exercises.filter(
        (exercise) =>
          exercise.title.toLowerCase().indexOf(searchKeyword.toLowerCase()) !==
          -1,
      );
  } else {
    result = exercises;
  }

  return (
    <div className="exercise-list-container">
      {error && <p className="error-message">{error}</p>}
      {loading && <h1 className="loading-message">LOADING ...</h1>}

      <div className="img-container">
        <Link to="/NewExercise" className="img-link">
          <button>Crear Nuevo Ejercicio</button>
        </Link>
      </div>

      {result.map(
        ({
          id_exercise,
          name,
          id_photo_exercise,
          description,
          typology,
          muscle_group,
          equipment,
        }) => (
          <ExerciseCard
            key={id_exercise}
            id={id_exercise}
            name={name}
            photo={id_photo_exercise}
            description={description}
            typology={typology}
            muscle_group={muscle_group}
            equipment={equipment}
          />
        ),
      )}
    </div>
  );
}

export default ExerciseList;
