import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExerciseCard from "../ExerciseCard";
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
        const response = await axios.get("/api/Exercise/ExerciseList");
        const reversedExercises = response.data.data.exercises.reverse();
        setExercises(reversedExercises);
      } catch (err) {
        setError(err);
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
      exercises.filter( exercise => exercise.title.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1);
  } else {
    result = exercises;
  }

  return (
    <div className="exercises-list-container">
      {error && <p className="error-message">{error}</p>}
      {loading && <h1 className="loading-message">LOADING ...</h1>}

      <div className="img-container">
        <Link to="user/exercise" className="img-link">
          <img
            src={imageUrl}
            alt="Agregar nuevo ejercicio"
            className="add-entry-img"
          />
        </Link>
      </div>
      <SearchBar searchHandler={searchHandler} />
      {result.map(({ nombre, tipologia, grupoMuscular, equipo }) => (
        <ExerciseCard key={id} id={id} nombre={nombre} tipologia={tipologia} grupoMuscular={grupoMuscular} equipo={equipo} />
      ))}
    </div>
  );
}

export default ExerciseList;
