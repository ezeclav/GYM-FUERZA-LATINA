import React, { useEffect } from "react";

const AddExerciseLike = ({ exerciseId }) => {
  console.log(exerciseId.exerciseId);
  useEffect(() => {
    const handleAddLike = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `/api/exercise/like/${exerciseId.exerciseId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          },
        );
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    // Llama a la función de agregar a favoritos al cargar el componente
    handleAddLike();
  }, [exerciseId]);

  // Puedes mostrar un mensaje u otro contenido si lo deseas
  return (
    <div>
      <h1>Agregado a Favoritos</h1>
    </div>
  );
};

export default AddExerciseLike;
