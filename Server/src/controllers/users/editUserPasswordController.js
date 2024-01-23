import updateUserPassModel from "../../models/users/updateUserPassModel.js";

const editUserPasswordController = async (req,res,next) => {
    try {
        
        const { email, recoverPassCode, newPassword } = req.body;

        await updateUserPassModel(email, recoverPassCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada'
        });

    } catch (error) {
        next(error);        
    }
}

export default editUserPasswordController;