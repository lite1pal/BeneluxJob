"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const helpers_1 = require("../helpers/helpers");
const applicationValidator_1 = require("../validators/applicationValidator");
exports.applicationRouter = express_1.default.Router();
exports.applicationRouter.post("/create", helpers_1.auth, applicationValidator_1.createApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.createApplication);
exports.applicationRouter.put("/update/:application_id", helpers_1.auth, helpers_1.admin, applicationValidator_1.updateApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.updateApplication);
exports.applicationRouter.get("/:application_id", helpers_1.auth, helpers_1.admin, applicationValidator_1.getApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.getApplication);
exports.applicationRouter.get("/", helpers_1.auth, helpers_1.admin, applicationController_1.getApplications);
exports.applicationRouter.delete("/delete/:application_id", helpers_1.auth, helpers_1.admin, applicationValidator_1.deleteApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.deleteApplication);
exports.applicationRouter.delete("/delete", helpers_1.auth, helpers_1.admin, applicationController_1.deleteApplications);
