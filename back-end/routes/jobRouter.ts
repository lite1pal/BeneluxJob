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
import { admin, handleValidationErrors } from "../helpers/helpers";
import { auth } from "../helpers/helpers";

export const jobRouter = express.Router();

jobRouter.post(
  "/create",
  auth,
  admin,
  createJobValidator,
  handleValidationErrors,
  createJob
);
jobRouter.put(
  "/update/:job_id",
  auth,
  admin,
  updateJobValidator,
  handleValidationErrors,
  updateJob
);
jobRouter.get(
  "/:job_id",
  auth,
  admin,
  getJobValidator,
  handleValidationErrors,
  getJob
);
jobRouter.get("/", getJobs);
jobRouter.delete(
  "/delete/:job_id",
  auth,
  admin,
  deleteJobValidator,
  handleValidationErrors,
  deleteJob
);
// jobRouter.delete("/delete", deleteJobs);
