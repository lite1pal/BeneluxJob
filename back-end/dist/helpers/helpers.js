"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.auth = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const userModel_1 = require("../models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const handleValidationErrors = (req, res, next) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({
            message: validationErrors,
            status: "Validation error",
        });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const sessionID = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const email = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[2];
        const user = yield userModel_1.User.find({ sessionID, email });
        console.log(user, sessionID, email);
        if (!sessionID || !email) {
            return res.status(404).json({
                message: "Request is not authorized",
                status: "Authorization error",
            });
        }
        // console.log("something is not working here...");
        next();
    }
    catch (err) {
        const message = "Error occured during authorizing a request";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Authorization error",
        });
    }
});
exports.auth = auth;
const admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const email = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[2];
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                message: "Access denied",
                status: "Access denied",
            });
        }
        next();
    }
    catch (err) {
        const message = "Error occured during providing an access to admin";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Access denied.",
        });
    }
});
exports.admin = admin;
