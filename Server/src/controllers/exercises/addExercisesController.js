import insertExerciseModel from "../../models/exercises/insertExcerciseModel.js";

const addExercisesController = async (req, res, next) => {
  try {
    const { name, description, id_photo, typology, muscle_group, equipment } =
      req.body;

    await insertExerciseModel(
      name,
      description,
      id_photo,
      typology,
      muscle_group,
      equipment
    );

    res.send({
      status: "ok",
      message: "¡Ejercicio creado con éxito!",
    });
  } catch (error) {
    next(error);
  }
};

export default addExercisesController;
