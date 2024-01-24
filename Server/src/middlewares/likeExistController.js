import getPool from "../database/getPool.js";
import { notLikeError } from "../services/errorService.js";

const listLikesController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const userId = req.params.userId || req.user?.id;

    const [likes] = await pool.query(
      `
        SELECT id_like_exercise, exerciseId, userId FROM like_exercises
        WHERE userId = ?
      `,
      [userId]
    );

    if (!likes.length) {
      notLikeError(`${userId}`);
    }
    res.send({
      status: "ok",
      data: likes,
    });
  } catch (error) {
    next(error);
  }
};

export default listLikesController;
