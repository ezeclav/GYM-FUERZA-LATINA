import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
//import ExercisePhoto from "../ExercisePhoto"; <---------- TIRA ERROR. POR SOLUCIONAR
import Modal from "../../Modal";
//import ExerciseLike from '../ExerciseLike'; <------------ TIRA ERROR. POR SOLUCIONAR
import "./ExerciseDetails.css";
import ExercisePhoto from "../ExercisePhoto/ExercisePhoto";

const ExerciseDetails = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log(exerciseId);
        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(
          `/api/exercise/${exerciseId}`,
          options
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

  const handleUploadSuccess = (newPhotos) => {
    setPhotos([...photos, newPhotos]);
  };

  if (!exercise) {
    return <div>Cargando...</div>;
  }

  const { name, description, typology, muscle_group, equipment } = exercise;

  return (
    <div className="exercise-details-container">
      <div className="foto-list">
        {exercise.photos &&
          exercise.photos.map((photo) => (
            <img
              key={photo.id_photo_exercise}
              src={photo.name}
              alt={`photo ${photo.id_photo_exercise}`}
              className="exercise-foto"
            />
          ))}
      </div>
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

      <button
        onClick={() => setShowPhotoModal(true)}
        className="add-photo-button"
      >
        Agregar foto
      </button>
      {showPhotoModal && (
        <Modal>
          <ExercisePhoto
            exerciseId={exerciseId}
            onClose={() => setShowPhotoModal(false)}
            onUpload={handleUploadSuccess}
          />
        </Modal>
      )}
      <Link to="#" onClick={() => window.history.back()}>
        VOLVER
      </Link>
    </div>
  );
};

export default ExerciseDetails;
