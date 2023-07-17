import express from "express";
import {
  createUser,
  deleteUser,
  deleteUsers,
  getUser,
  signinUser,
  signinUserGoogle,
} from "../controllers/userController";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  signinUserValidator,
  signingUserGoogleValidator,
} from "../validators/userValidator";
import { handleValidationErrors } from "../helpers/helpers";
import { sendEmail } from "../services/email";
export const userRouter = express.Router();

userRouter.post(
  "/create",
  createUserValidator,
  handleValidationErrors,
  createUser
);
userRouter.post(
  "/signin",
  signinUserValidator,
  handleValidationErrors,
  signinUser
);
userRouter.post(
  "/signin_google",
  signingUserGoogleValidator,
  handleValidationErrors,
  signinUserGoogle
);
userRouter.get("/:user_id", getUserValidator, handleValidationErrors, getUser);
// userRouter.delete(
//   "/delete/:user_id",
//   deleteUserValidator,
//   handleValidationErrors,
//   deleteUser
// );
// userRouter.delete("/delete", deleteUsers);
userRouter.post("/send_email", sendEmail);
