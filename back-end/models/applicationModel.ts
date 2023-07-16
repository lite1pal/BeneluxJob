import mongoose, { Schema } from "mongoose";

interface IApplication {
  first_name: string;
  last_name: string;
  age: number;
  phone_number: number;
  email: string;
  additionalList: string;
  job_id: mongoose.Types.ObjectId;
}

const applicationSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    phone_number: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    additionalList: { type: String },
    job_id: { type: String, ref: "Job", required: true },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);
