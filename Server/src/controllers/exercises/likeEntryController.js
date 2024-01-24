import insertLikeModel from "../../models/exercises/insertLikeModel.js";

const likeEntryController = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const userId = req.user.id;

    const like = await insertLikeModel(userId, entryId, new Date());

    res.send({
      status: "ok",
      data: like,
    });
  } catch (error) {
    next(error);
  }
};

export default likeEntryController;
