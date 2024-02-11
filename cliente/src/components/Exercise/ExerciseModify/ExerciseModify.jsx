import React from "react";
import { useParams } from "react-router-dom";
import ExerciseDetails from "../ExerciseDetails/ExerciseDetails";

const ExerciseModify = () => {
  const { exerciseId } = useParams();

  useEffect(() => {
    async () => {
      const token = auth.getToken();
      try {
        await axios.post("api/modifExercise/:exerciseId", null, {
          headers: {
            Authorization: token,
          },
        });
      } catch (error) {
        console.error("Error al modificar:", error);
      }
    };
  });

  return (
    <div>
      <h2>Editar Ejercicio</h2>
      <p>Exercise ID: {exerciseId}</p>
      <ExerciseDetails />
    </div>
  );
};

export default ExerciseModify;
