import mongoose from "mongoose";

export const User = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  hashedPassword: String,
  token: String,
});
