import mongoose, { Schema } from "mongoose";

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  phone_number: number;
  hashedPassword: string;
  sessionID: string;
  jwtToken: string;
}

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    phone_number: Number,
    hashedPassword: String,
    sessionID: String,
    jwtToken: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
