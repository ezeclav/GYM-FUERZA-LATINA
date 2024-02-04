import { useState } from "react";
import axios from "axios";
import Auth from "../../../utils/auth";
import "./ExercisePhoto.css";

function ExercisePhoto({ exerciseId, onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("foto", file);

    try {
      const token = Auth.getToken();
      const response = await axios.post(
        `api/exercises/${exerciseId}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      onUpload();
    } catch (error) {
      console.error("Error al cargar la foto:", error);
    }
  };

  return (
    <div className="exercise-details-container ">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Foto</button>
    </div>
  );
}

export default ExercisePhoto;
