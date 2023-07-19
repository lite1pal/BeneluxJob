"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userValidator_1 = require("../validators/userValidator");
const helpers_1 = require("../helpers/helpers");
const email_1 = require("../services/email");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/create", userValidator_1.createUserValidator, helpers_1.handleValidationErrors, userController_1.createUser);
exports.userRouter.post("/signin", userValidator_1.signinUserValidator, helpers_1.handleValidationErrors, userController_1.signinUser);
exports.userRouter.post("/signin_google", userValidator_1.signingUserGoogleValidator, helpers_1.handleValidationErrors, userController_1.signinUserGoogle);
exports.userRouter.get("/:user_id", userValidator_1.getUserValidator, helpers_1.handleValidationErrors, userController_1.getUser);
exports.userRouter.delete("/delete/:user_id", userValidator_1.deleteUserValidator, helpers_1.handleValidationErrors, userController_1.deleteUser);
// userRouter.delete("/delete", deleteUsers);
exports.userRouter.post("/send_email", email_1.sendEmail);
