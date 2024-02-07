import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
//import ExercisePhoto from "../ExercisePhoto"; <---------- TIRA ERROR. POR SOLUCIONAR
import Modal from "../../Modal";
//import ExerciseLike from '../ExerciseLike'; <------------ TIRA ERROR. POR SOLUCIONAR
import "./ExerciseDetails.css";

const ExerciseDetails = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(exerciseId);
        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(
          `/api/exercise/${exerciseId}`,
          options,
        );
        setExercise(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [exerciseId]);

  const handleUploadSuccess = (newPicture) => {
    setPictures([...pictures, newPicture]);
  };

  if (!exercise) {
    return <div>Cargando...</div>;
  }

  const { name, fotos, description, typology, muscle_group, equipment } =
    exercise;

  return (
    <div className="exercise-details-container">
      {error && <p>{error}</p>}
      {loading && <h1>LOADING ...</h1>}
      {exercise && (
        <>
          <h2 className="exercise-nombre">Nombre: {name}</h2>
          <h3 className="exercise-descripcion">Descripcion: {description}</h3>
          <p className="exercise-tipologia">Tipología: {typology}</p>
          <p className="exercise-grupoMuscular">
            Grupo Muscular: {muscle_group}
          </p>
          <p className="exercise-equipo">Equipo: {equipment}</p>
        </>
      )}
      <div className="foto-list">
        {fotos &&
          fotos.map((foto) => (
            <img
              key={foto.id}
              src={foto.name}
              alt={`Foto ${foto.id}`}
              className="exercise-foto"
            />
          ))}
      </div>
      {showPhotoModal && (
        <Modal>
          <ExercisePhoto
            exerciseId={exerciseId}
            onClose={() => setShowPhotoModal(false)}
            onUpload={handleUploadSuccess}
          />
        </Modal>
      )}
    </div>
  );
};

export default ExerciseDetails;
