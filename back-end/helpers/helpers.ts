import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      message: validationErrors,
      status: "Validation error",
    });
  }
  next();
};

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const sessionID = req.headers.authorization?.split(" ")[1];
    const email = req.headers.authorization?.split(" ")[2];
    const user = await User.find({ sessionID, email });
    console.log(user, sessionID, email);
    if (!sessionID || !email) {
      return res.status(404).json({
        message: "Request is not authorized",
        status: "Authorization error",
      });
    }
    // console.log("something is not working here...");
    next();
  } catch (err) {
    const message = "Error occured during authorizing a request";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Authorization error",
    });
  }
};

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const email = req.headers.authorization?.split(" ")[2];
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        message: "Access denied",
        status: "Access denied",
      });
    }
    next();
  } catch (err) {
    const message = "Error occured during providing an access to admin";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Access denied.",
    });
  }
};
