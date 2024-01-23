import selectAllExercisesModel from "../../models/exercises/selectAllExercisesModel.js";

const listExercisesController = async (req, res, next) => {
  try {
    const exercises = await selectAllExercisesModel();

    res.send({
      data: exercises,
    });
  } catch (error) {
    next(error);
  }
};

export default listExercisesController;
