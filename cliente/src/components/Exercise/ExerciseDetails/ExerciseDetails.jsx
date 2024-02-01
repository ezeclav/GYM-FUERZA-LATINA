import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
//import ExercisePhoto from "../ExercisePhoto"; <---------- TIRA ERROR
import Modal from "../../Modal";
//import ExerciseLike from '../ExerciseLike'; <------------ TIRA ERROR
import "./ExerciseDetails.css";

const ExerciseDetails = () => {
  const { exerciseId } = useParams();
  const { user } = useContext(AuthContext);
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [pictures, setPictures] = useState([]); 


  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`/api/exercisesId/${exerciseId}`);
        setExercise(response.data.data.exercise);
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

  const { nombre, foto, descripcion, tipologia, grupoMuscular, equipo } = exercise;


  return (
    <div className="exercise-details-container">
      {error && <p>{error}</p>}
      {loading && <h1>LOADING ...</h1>}
      {exercise && (
        <>
          <h2 className="exercise-nombre">Nombre: {nombre}</h2>
          <h3 className="exercise-descripcion">Descripcion: {descripcion}</h3>
          <p className="exercise-tipologia">Tipología: {tipologia}</p>
          <p className="exercise-grupoMuscular">Grupo Muscular: {grupoMuscular}</p>
          <p className="exercise-equipo">Equipo: {equipo}</p>
          <ExerciseLike exerciseId={exerciseId}/>
        </>
      )}
      <div className="foto">
        {foto &&
          foto.map((foto) => (
            <img
              key={foto.id}
              src={foto.name}
              alt={`Foto ${foto.id}`}
              className="exercise-foto"
            />
          ))}

      </div>
      {user.id === userId && (
        <button
          onClick={() => setShowPhotoModal(true)}
          className="add-exercise-button"
        >
          Agregar ejercicio
        </button>
      )}
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
