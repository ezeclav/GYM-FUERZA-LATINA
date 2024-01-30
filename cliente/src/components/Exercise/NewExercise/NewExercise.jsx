import { useState } from 'react';
import axios from 'axios';
import auth from '../../../utils/auth';
import './NewExercise.css'; 
import { Link, useNavigate } from 'react-router-dom';

function NewExercise() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    foto: '',
    tipologia: '',
    grupoMuscular: '',
    equipo: ''
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('Nombre', formData.nombre);
    formDataToSend.append('Descripción', formData.descripcion);
    formDataToSend.append('Foto', formData.foto);
    formDataToSend.append('Tipología', formData.tipologia);
    formDataToSend.append('Grupo Muscular', formData.grupoMuscular);
    formDataToSend.append('Equipo', formData.equipo);

    const token = auth.getToken()
    try {
      const response = await axios.post('api/newExercises', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('New exercise created:', response.data);
      if(response.data.status === 'ok'){
        navigate('/');
      }
    } catch (error) {
      console.error('Error al crear un nuevo ejercicio:', error);
    }
  };

  return (
    <div className="new-exercise-form">
      <h2>Crea un nuevo ejercicio</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="Foto">Foto:</label>
          <img
            src={imageUrl}
            type="img"
            alt="foto"
            value={formData.foto}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Descripcion">Descripción: </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="Tipologia">Tipología:</label>
          <input
            type="text"
            id="tipologia"
            name="tipologia"
            value={formData.tipologia}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="GrupoMuscular">Grupo Muscular:</label>
          <input
            type="text"
            id="grupomuscular"
            name="grupomuscular"
            value={formData.grupoMuscular}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Ejercicio</button>
        <Link to="/">Cancelar</Link>
      </form>
    </div>
  );
}

export default NewExercise;
