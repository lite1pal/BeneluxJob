import mongoose, { Schema } from "mongoose";

interface IApplication {
  first_name: string;
  last_name: string;
  age: number;
  phone_number: number;
  email: string;
  additionalList: string;
}

const applicationSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    age: Number,
    phone_number: Number,
    email: String,
    additionalList: String,
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);
