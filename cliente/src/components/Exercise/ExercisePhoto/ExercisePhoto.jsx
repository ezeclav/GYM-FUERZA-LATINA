import { useState } from "react";
import axios from "axios";
import Auth from "../../../utils/auth";
import "./ExercisePhoto.css";

function ExercisePhoto({ exerciseId, onClose, onUpload }) {
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
        `/api/exercises/${exerciseId}/fotos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      onUpload();
      onClose();
    } catch (error) {
      console.error("Error al cargar la foto:", error);
    }
  };

  return (
    <div className="exercise-details-container ">
      <h3 className="exercise-title">Agregar Foto</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Foto</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default ExercisePhoto;
