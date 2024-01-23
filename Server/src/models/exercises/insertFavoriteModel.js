import getPool from "../../database/getPool.js";
import { favAlreadyExistsError } from "../../services/errorService.js";

const insertFavoriteModel = async (exerciseId, userId) => {
  const pool = await getPool();

  /////////////////////// COMPROBAMOS SI YA EL USUARIO LE DIO LIKE. //////////////////////

  const [favs] = await pool.query(
    `
            SELECT id_like_exercise FROM like_exercise
            WHERE exerciseId=? AND userId = ?
        `,
    [exerciseId, userId]
  );

  if (favs.length) favAlreadyExistsError();

  /////////////////// SE INSERTA EL LIKE DEL USUARIO //////////////////////
  await pool.query(
    `
            INSERT INTO like_exercise (exerciseId, userId)
            VALUES (?,?)
        `,
    [exerciseId, userId]
  );

  return Number(favsAvg[0].avg);
};


////////////////////////// SE VEN LA CANTIDAD DE LIKES /////////////////////

const getLikesCount = async (exerciseId) => {
  const pool = await getPool();

const [likesCount] = await pool.query(
  `
    SELECT COUNT(*) AS count FROM like_exercise WHERE exerciseId = ?
  `,
  [exerciseId]
);

if (likesCount.length === 0) {
  favNotFoundError(); 
}

return Number(likesCount[0].count);
};

export default { insertFavoriteModel, getLikesCount };
