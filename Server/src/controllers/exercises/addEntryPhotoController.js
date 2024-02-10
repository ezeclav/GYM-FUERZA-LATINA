import insertPhotoModel from "../../models/exercises/insertPhotoModel.js";
import selectExerciseByIdModel from "../../models/exercises/selectExerciseByIdModel.js";
import { cloudinaryService } from "../../services/cloudinaryService.js";
import { photoLimitReachedError } from "../../services/errorService.js";
import validateSchemaUtil from "../../util/validateSchemaUtil.js";

const addEntryPhotoController = async (req, res, next) => {
  try {
    // Obtenemos el id de al entrada de los path params.
    const { exerciseId } = req.params;

    // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío
    // si se da el caso.

    //await validateSchemaUtil(addExercisePhotoSchema, req.files.photo || {});

    // // Obtenemos la información de la entrada para comprobar si somos los propietarios.
    // const exercise = await selectExerciseByIdModel(exerciseId);

    // // Si la entrada tiene más de tres fotos lanzamos un error.
    // if (exercise.photo.length > 2) {
    //   photoLimitReachedError();
    // }

    const photoName = await cloudinaryService(req.files.photo);

    const photoId = await insertPhotoModel(photoName, exerciseId);
    console.log(photoId);
    res.send({
      status: "ok",
      data: {
        photo: {
          id: photoId,
          name: photoName,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addEntryPhotoController;
