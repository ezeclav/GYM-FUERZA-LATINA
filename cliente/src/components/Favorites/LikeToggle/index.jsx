import React, { useState } from "react";
import AddExerciseLike from "../AddExerciseLike";
import DeleteExerciseLike from "../DeleteExerciseLike";

const LikeToggle = (id) => {
  const [isLiked, setIsLiked] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setClicked(true);
  };
  // console.log(id);
  return (
    <div>
      {/* Icono de corazón que cambia al hacer clic */}
      <span
        onClick={handleLikeToggle}
        style={{ cursor: "pointer", color: isLiked ? "red" : "black" }}
      >
        &#10084; {/* Código de corazón */}
      </span>

      {/* Renderizar el componente correspondiente según el estado */}
      {clicked && (
        <div>
          {isLiked ? (
            <AddExerciseLike exerciseId={id} />
          ) : (
            <DeleteExerciseLike exerciseId={id} />
          )}
          {/* Otro contenido que deseas renderizar después de hacer clic */}
        </div>
      )}
    </div>
  );
};

export default LikeToggle;
