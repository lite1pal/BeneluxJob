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
  getJobs,
  deleteJobs,
} from "../controllers/jobController";
import { handleValidationErrors } from "../helpers/helpers";

export const jobRouter = express.Router();

jobRouter.post(
  "/create",
  createJobValidator,
  handleValidationErrors,
  createJob
);
jobRouter.put(
  "/update/:job_id",
  updateJobValidator,
  handleValidationErrors,
  updateJob
);
jobRouter.get("/:job_id", getJobValidator, handleValidationErrors, getJob);
jobRouter.get("/", getJobs);
jobRouter.delete(
  "/delete/:job_id",
  deleteJobValidator,
  handleValidationErrors,
  deleteJob
);
jobRouter.delete("/delete", deleteJobs);
