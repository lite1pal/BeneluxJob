import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { verifyJWT } from "../services/google";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { first_name, last_name, email, age, phone_number, password, key } =
      req.body;

    let { admin } = req.body;

    if (key !== process.env.ADMINKEY) {
      admin = false;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        message: "Account with this email was created before",
        status: "Already exists error",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      age,
      phone_number,
      hashedPassword,
      admin,
    });
    const { _id } = newUser;
    return res.status(200).json({
      message: "User is created",
      result: { _id },
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during creating a user";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const signinUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "Account with this email is not created",
        status: "Not created error",
      });
    }
    const isPasswordTheSame = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );
    const { first_name, last_name, age, phone_number, admin, _id } =
      existingUser;
    const user = {
      first_name,
      last_name,
      email,
      age,
      phone_number,
      admin,
      _id,
    };
    if (!isPasswordTheSame) {
      return res.status(403).json({
        message: "Password is incorrect",
        status: "Authorization error",
      });
    }

    await User.updateOne({ email }, { sessionID: req.sessionID });

    const jwtToken = jwt.sign({ email, _id }, process.env.JWT_SECRET!);

    return res.status(200).json({
      message: "User is signed in",
      result: { sessionID: req.sessionID, user, jwtToken },
      status: "Success",
    });
  } catch (err) {
    const message = "Error during signing in a user";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const signinUserGoogle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { googleToken } = req.body;
    const googleUser = await verifyJWT(process.env.GOOGLE_ID!, googleToken);
    if (!googleUser) {
      return res.status(403).json({
        message: "Google authorization is failed",
        status: "Authorization error",
      });
    }
    const existingUser = await User.findOne({ email: googleUser.email });
    let user;
    if (!existingUser) {
      const newUser = await User.create({
        email: googleUser.email,
        sessionID: req.sessionID,
        hashedPassword: googleUser.sub,
      });
      const { email, admin } = newUser;
      user = { email, admin };
    } else {
      await User.updateOne({ sessionID: req.sessionID });
      user = existingUser;
    }
    return res.status(200).json({
      message: "User is signed in via Google",
      result: { sessionID: req.sessionID, user },
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during signing a user via Google";
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user_id } = req.params;
    const foundUser = await User.findById(user_id);
    if (!foundUser) {
      return res.status(404).json({
        message: "Not found a user",
        status: "Not found error",
      });
    }
    const {
      first_name,
      last_name,
      age,
      email,
      phone_number,
      admin,
      sessionID,
    } = foundUser;
    const user = {
      first_name,
      last_name,
      age,
      email,
      phone_number,
      admin,
      sessionID,
    };
    console.log(user);
    return res.status(200).json({
      message: "User is got",
      result: user,
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during getting a user";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user_id } = req.params;
    const existingUser = await User.findById(user_id);
    if (!existingUser) {
      return res.status(404).json({
        message: "Account with this user_id is not created",
        status: "Not created error",
      });
    }
    await User.deleteOne({ _id: user_id });
    return res.status(200).json({
      message: "User is deleted",
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during deleting a user";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const deleteUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await User.deleteMany({});
    return res.status(200).json({
      message: "User are deleted",
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during deleting users";
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};
