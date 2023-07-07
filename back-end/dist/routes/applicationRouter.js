"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const helpers_1 = require("../helpers/helpers");
const applicationRouter_1 = require("../validators/applicationRouter");
exports.applicationRouter = express_1.default.Router();
exports.applicationRouter.post("/create", applicationRouter_1.createApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.createApplication);
exports.applicationRouter.put("/update/:application_id", applicationRouter_1.updateApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.updateApplication);
exports.applicationRouter.get("/:application_id", applicationRouter_1.getApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.getApplication);
exports.applicationRouter.delete("/delete/:application_id", applicationRouter_1.deleteApplicationValidator, helpers_1.handleValidationErrors, applicationController_1.deleteApplication);
