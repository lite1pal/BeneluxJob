import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { verifyJWT } from "../services/google";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { first_name, last_name, email, age, phone_number, password } =
      req.body;

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
    });
    return res.status(200).json({
      message: "User is created",
      result: newUser,
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
    const { first_name, last_name, age, phone_number } = existingUser;
    const user = { first_name, last_name, email, age, phone_number };
    if (!isPasswordTheSame) {
      return res.status(403).json({
        message: "Password is incorrect",
        status: "Authorization error",
      });
    }

    await User.updateOne({ email }, { sessionID: req.sessionID });

    return res.status(200).json({
      message: "User is signed in",
      result: { sessionID: req.sessionID, user },
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
      });
      user = newUser;
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
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        message: "Not found a user",
        status: "Not found error",
      });
    }
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
