import express from "express";
import {
  createApplication,
  deleteApplication,
  getApplication,
  updateApplication,
} from "../controllers/applicationController";
import { handleValidationErrors } from "../helpers/helpers";
import {
  createApplicationValidator,
  deleteApplicationValidator,
  getApplicationValidator,
  updateApplicationValidator,
} from "../validators/applicationRouter";
export const applicationRouter = express.Router();

applicationRouter.post(
  "/create",
  createApplicationValidator,
  handleValidationErrors,
  createApplication
);

applicationRouter.put(
  "/update/:application_id",
  updateApplicationValidator,
  handleValidationErrors,
  updateApplication
);

applicationRouter.get(
  "/:application_id",
  getApplicationValidator,
  handleValidationErrors,
  getApplication
);

applicationRouter.delete(
  "/delete/:application_id",
  deleteApplicationValidator,
  handleValidationErrors,
  deleteApplication
);
