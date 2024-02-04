import jwt from "jsonwebtoken";
import {
  invalidCredentialsError,
  notAuthenticatedError,
} from "../services/errorService.js";

const authUserController = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    try {
      console.log(authorization);
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);
      console.log(tokenInfo);
      req.user = tokenInfo;

      next();
    } catch (error) {
      invalidCredentialsError();
    }
  } catch (error) {
    next(error);
  }
};

export default authUserController;
