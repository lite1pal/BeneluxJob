import express from "express";
import {
  createApplication,
  deleteApplication,
  deleteApplications,
  getApplication,
  getApplications,
  updateApplication,
} from "../controllers/applicationController";
import { admin, auth, handleValidationErrors } from "../helpers/helpers";
import {
  createApplicationValidator,
  deleteApplicationValidator,
  getApplicationValidator,
  updateApplicationValidator,
} from "../validators/applicationValidator";
export const applicationRouter = express.Router();

applicationRouter.post(
  "/create",
  auth,
  createApplicationValidator,
  handleValidationErrors,
  createApplication
);

applicationRouter.put(
  "/update/:application_id",
  auth,
  updateApplicationValidator,
  handleValidationErrors,
  updateApplication
);

applicationRouter.get(
  "/:application_id",
  auth,
  getApplicationValidator,
  handleValidationErrors,
  getApplication
);

applicationRouter.get("/", auth, getApplications);

applicationRouter.delete(
  "/delete/:application_id",
  auth,
  deleteApplicationValidator,
  handleValidationErrors,
  deleteApplication
);

applicationRouter.delete("/delete", deleteApplications);
