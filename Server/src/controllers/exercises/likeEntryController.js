import insertLikeModel from "../../models/exercises/insertLikeModel.js";

const likeEntryController = async (req, res, next) => {
  try {
    const { entryId } = req.params;

    const userId = req.user.id; // Obtén el ID del usuario desde el objeto de usuario en la solicitud

    // Llama a la función para insertar el like en la tabla correspondiente
    const likes = await insertLikeModel(userId, entryId, new Date());

    // Puedes realizar operaciones adicionales aquí, como recalcular el promedio de votos si es necesario

    res.send({
      status: "ok",
      data: likes, // Puedes devolver información adicional si es necesario
    });
  } catch (error) {
    next(error);
  }
};

export default likeEntryController;
