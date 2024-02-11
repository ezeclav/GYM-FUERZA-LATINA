import React from "react";
import axios from "axios";

const ExerciseDelete = ({ exerciseId, onDelete }) => {
  const handleDelete = async () => {
    try {
        const token = localStorage.getItem("token");

        const options = {
          headers: {
            Authorization: token,
          },
        };

      await axios.delete(`/deleteExercise/${exerciseId}`, options);
      onDelete(exerciseId);
    } catch (error) {
      console.error("Error al eliminar el ejercicio:", error);
    }
  };

  return (
    <div>
        <h2> ¿Realmente quieres eliminar el ejercicio? </h2>
        <button onClick={() => handleDelete(exerciseId)}>Eliminar</button>
    </div>
  );
};

export default ExerciseDelete;
