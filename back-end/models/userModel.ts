import mongoose, { Schema } from "mongoose";

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  phone_number: number;
  hashedPassword: string;
  sessionID: string;
  admin: boolean;
}

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, required: true, unique: true },
    age: Number,
    phone_number: Number,
    hashedPassword: String,
    sessionID: String,
    admin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
