import mongoose from "mongoose";

interface IJob {
  name: string;
  description: string;
  salary: number;
  hot: boolean;
  withLivingHouse: boolean;
  withoutLanguage: boolean;
}

const jobSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    salary: Number,
    hot: Boolean,
    withLivingHouse: Boolean,
    withoutLanguage: Boolean,
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", jobSchema);
