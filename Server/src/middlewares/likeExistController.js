import getPool from "../database/getPool.js";
import { notFoundError } from "../services/errorService.js";

const listLikesController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const userId = req.params.userId || req.user?.id;

    const [likes] = await pool.query(
      `
        SELECT id_like_exercise, exerciseId, userId FROM like_exercises
        WHERE userId = ?
      `,
      [userId],
    );

    if (!likes.length) {
      notFoundError(`${userId}`);
    }

    res.json(likes);
  } catch (error) {
    next(error);
  }
};

export default listLikesController;
