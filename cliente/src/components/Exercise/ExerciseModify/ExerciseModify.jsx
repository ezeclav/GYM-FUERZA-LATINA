import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ExerciseModify = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState({
    name: "",
    description: "",
    typology: "",
    muscle_group: "",
    equipment: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    options();
    try {
      await axios.put(`/api/modifExercise/${exerciseId}`, {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      console.error("Error al modificar el ejercicio:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value
    }));
  };


  return (
    <div>
      <h2>Editar Ejercicio</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={exercise.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={exercise.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Tipología:
          <input
            type="text"
            name="typology"
            value={exercise.typology}
            onChange={handleChange}
          />
        </label>
        <label>
          Grupo Muscular:
          <input
            type="text"
            name="muscle_group"
            value={exercise.muscle_group}
            onChange={handleChange}
          />
        </label>
        <label>
          Equipamiento:
          <input
            type="text"
            name="equipment"
            value={exercise.equipment}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ExerciseModify;
