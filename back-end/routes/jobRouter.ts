import express from "express";

// validators
import {
  createJobValidator,
  updateJobValidator,
  getJobValidator,
  deleteJobValidator,
} from "../validators/jobValidator";

// controllers
import {
  createJob,
  updateJob,
  getJob,
  deleteJob,
} from "../controllers/jobController";

export const jobRouter = express.Router();

jobRouter.post("/create", createJobValidator, createJob);
jobRouter.put("/update/:job_id", updateJobValidator, updateJob);
jobRouter.get("/:job_id", getJobValidator, getJob);
jobRouter.delete("/delete/:job_id", deleteJobValidator, deleteJob);
