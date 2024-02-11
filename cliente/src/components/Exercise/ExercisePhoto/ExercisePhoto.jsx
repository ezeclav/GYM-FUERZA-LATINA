import { useState } from "react";
import axios from "axios";
import Auth from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import "./ExercisePhoto.css";

function ExercisePhoto({ exerciseId, onUpload, onClose }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const token = Auth.getToken();
      const response = await axios.post(
        `api/exercise/${exerciseId}/photo`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      navigate("/exercise/");
    } catch (error) {
      console.error("Error al cargar la foto:", error);
    }
  };

  return (
    <div className="exercise-details-container ">
      <h2 className="entry-title">Agregar Foto</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Foto</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default ExercisePhoto;
