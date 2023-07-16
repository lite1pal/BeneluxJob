import mongoose from "mongoose";

interface IJob {
  name: string;
  description: string;
  salary: number;
  hot: boolean;
  withLivingHouse: boolean;
  withoutLanguage: boolean;
  withoutExp: boolean;
}

const jobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    hot: { type: Boolean, required: true, default: false },
    withLivingHouse: { type: Boolean, required: true, default: false },
    withoutLanguage: { type: Boolean, required: true, default: false },
    withoutExp: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", jobSchema);
