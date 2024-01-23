import selectExerciseByIdModel from "../../models/exercises/selectExerciseByIdModel.js";
import { cannotVoteOwnEntryError } from "../../services/errorService.js";
import insertFavoriteModel from "../../models/exercises/insertFavoriteModel.js";

const favExercisesController = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;

    const exercise = await selectExerciseByIdModel(exerciseId);

    ////////////// QUIEN CREA EL EJERCICIO NO PUEDE DARLE FAVORITOS ////////////////

    if (exercise.userId === req.user.id_user) cannotVoteOwnEntryError();

    const favAvg = await insertFavoriteModel(exerciseId, req.user.id_user);

    res.send({
      status: "ok",
      data: favAvg,
    });
  } catch (error) {
    next(error);
  }
};

export default favExercisesController;
