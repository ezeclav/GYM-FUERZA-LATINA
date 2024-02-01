import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ initialExerciseId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [exerciseId, setExerciseId] = useState(initialExerciseId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3050/api/exercises/like`); // /${exerciseId}
        const { userId } = response.data;
        setIsLiked(response.data.status === 'ok');
        setUserId(userId);
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      }
    };

    fetchData();
  }, [exerciseId]);

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:3050/api/exercises/like`);
      setIsLiked(true);
      // Puedes realizar más acciones después de dar like, si es necesario
    } catch (error) {
      console.error('Error al dar like al ejercicio:', error);
    }
  };


  return (
    <div>
      {userId && (
        <button onClick={handleLike} disabled={isLiked}>
          {isLiked ? 'Liked' : 'Like'}
        </button>
      )}
    </div>
  );
};

export default LikeButton;