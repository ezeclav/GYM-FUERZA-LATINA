import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ExercisePhoto from "../ExercisePhoto/ExercisePhoto";
import { AuthContext } from "../../../context/AuthContext.jsx";
import ExerciseCard from "../ExerciseCard/ExerciseCard.jsx";

const ExerciseDetails = () => {
  const { exerciseId } = useParams();
  const history = useHistory();
  const [exerciseData, setExerciseData] = useState({
    name: "",
    description: "",
    photo: "",
    typology: "",
    muscle_group: "",
    equipment: ""
  });

  const admin = useContext(AuthContext);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`/api/exercises/${exerciseId}`);
        setExerciseData(response.data.data.exercise);
      } catch (err) {
        console.error("Error al acceder al ejercicio:", err);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/modifExercise/${exerciseId}`, exerciseData);
      history.push(`/exercises/${exerciseId}`);
    } catch (err) {
      console.error("Error al editar el ejercicio:", err);
    }
  };

  
    return (
    <div>
      <h2>Editar Ejercicio</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={exerciseData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={exerciseData.description}
            onChange={handleChange}
          />
        </label>
        <label> Foto: 
        <ExercisePhoto />
        </label>
        <label>
          Tipología:
          <input
            type="text"
            name="tipología"
            value={exerciseData.typology}
            onChange={handleChange}
          />
        </label>
        <label>
          Grupo Muscular:
          <input
            type="text"
            name="grupo muscular"
            value={exerciseData.muscle_group}
            onChange={handleChange}
          />
        </label>
        <label>
          Equipamiento:
          <input
            type="text"
            name="nombre"
            value={exerciseData.equipment}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ExerciseDetails;

