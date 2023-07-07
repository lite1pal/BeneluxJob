"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const express_1 = __importDefault(require("express"));
// validators
const jobValidator_1 = require("../validators/jobValidator");
// controllers
const jobController_1 = require("../controllers/jobController");
const helpers_1 = require("../helpers/helpers");
exports.jobRouter = express_1.default.Router();
exports.jobRouter.post("/create", jobValidator_1.createJobValidator, helpers_1.handleValidationErrors, jobController_1.createJob);
exports.jobRouter.put("/update/:job_id", jobValidator_1.updateJobValidator, helpers_1.handleValidationErrors, jobController_1.updateJob);
exports.jobRouter.get("/:job_id", jobValidator_1.getJobValidator, helpers_1.handleValidationErrors, jobController_1.getJob);
exports.jobRouter.get("/", jobController_1.getJobs);
exports.jobRouter.delete("/delete/:job_id", jobValidator_1.deleteJobValidator, helpers_1.handleValidationErrors, jobController_1.deleteJob);
exports.jobRouter.delete("/delete", jobController_1.deleteJobs);
