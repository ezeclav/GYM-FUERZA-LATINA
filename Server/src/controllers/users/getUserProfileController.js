import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";

const getUserProfileController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await selectUserByIdModel(userId);

    // Eliminamos los datos privados del usuario. (opcional)
    // delete user.email;

    res.send({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getUserProfileController;
