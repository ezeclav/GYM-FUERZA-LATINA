import insertLikeModel from "../../models/exercises/insertLikeModel.js";

const likeEntryController = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const userId = req.user.id;
    console.log(userId);
    const like = await insertLikeModel(userId, entryId, new Date());

    res.send({
      status: "ok",
      message: "like guardado",
    });
  } catch (error) {
    next(error);
  }
};

export default likeEntryController;
