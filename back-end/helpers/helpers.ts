import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/userModel";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
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

interface IDecodedToken {
  email: string;
  _id: string;
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Request is not authorized",
        status: "Authorization error",
      });
    }

    const jwtToken = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET!
    ) as IDecodedToken;
    const { email, _id } = decodedToken;

    if (!email || !_id) {
      return res.status(401).json({
        message: "Request is not authorized",
        status: "Authorization error",
      });
    }

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
