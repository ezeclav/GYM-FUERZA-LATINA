import getPool from "../../database/getPool.js";
import { favAlreadyExistsError } from "../../services/errorService.js";

const insertLikeModel = async (userId, exerciseId) => {
  const pool = await getPool();

  /////////////////////// COMPROBAMOS SI YA EL USUARIO LE DIO LIKE. //////////////////////

  const [favs] = await pool.query(
    `
            SELECT id_like_exercise FROM like_exercises
            WHERE exerciseId=? AND userId = ?
        `,
    [exerciseId, userId],
  );

  if (favs.length >= 11) favAlreadyExistsError();

  /////////////////// SE INSERTA EL LIKE DEL USUARIO //////////////////////
  const [result] = await pool.query(
    `
            INSERT INTO like_exercises (exerciseId, userId)
            VALUES (?,?)
        `,
    [exerciseId, userId],
  );

  return result;
};

export default insertLikeModel;
