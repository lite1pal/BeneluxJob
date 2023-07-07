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
exports.deleteUser = exports.getUser = exports.signinUserGoogle = exports.signinUser = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const google_1 = require("../services/google");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, age, phone_number, password } = req.body;
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({
                message: "Account with this email was created before",
                status: "Already exists error",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield userModel_1.User.create({
            first_name,
            last_name,
            email,
            age,
            phone_number,
            hashedPassword,
        });
        return res.status(200).json({
            message: "User is created",
            result: newUser,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during creating a user";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.createUser = createUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield userModel_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "Account with this email is not created",
                status: "Not created error",
            });
        }
        const isPasswordTheSame = yield bcrypt_1.default.compare(password, existingUser.hashedPassword);
        const { first_name, last_name, age, phone_number } = existingUser;
        const user = { first_name, last_name, email, age, phone_number };
        if (!isPasswordTheSame) {
            return res.status(403).json({
                message: "Password is incorrect",
                status: "Authorization error",
            });
        }
        yield userModel_1.User.updateOne({ email }, { sessionID: req.sessionID });
        return res.status(200).json({
            message: "User is signed in",
            result: { sessionID: req.sessionID, user },
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error during signing in a user";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.signinUser = signinUser;
const signinUserGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { googleToken } = req.body;
        const googleUser = yield (0, google_1.verifyJWT)(process.env.GOOGLE_ID, googleToken);
        if (!googleUser) {
            return res.status(403).json({
                message: "Google authorization is failed",
                status: "Authorization error",
            });
        }
        const existingUser = yield userModel_1.User.findOne({ email: googleUser.email });
        let user;
        if (!existingUser) {
            const newUser = yield userModel_1.User.create({
                email: googleUser.email,
                sessionID: req.sessionID,
            });
            user = newUser;
        }
        else {
            yield userModel_1.User.updateOne({ sessionID: req.sessionID });
            user = existingUser;
        }
        return res.status(200).json({
            message: "User is signed in via Google",
            result: { sessionID: req.sessionID, user },
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during signing a user via Google";
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.signinUserGoogle = signinUserGoogle;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const user = yield userModel_1.User.findById(user_id);
        if (!user) {
            return res.status(404).json({
                message: "Not found a user",
                status: "Not found error",
            });
        }
        return res.status(200).json({
            message: "User is got",
            result: user,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during getting a user";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const existingUser = yield userModel_1.User.findById(user_id);
        if (!existingUser) {
            return res.status(404).json({
                message: "Account with this user_id is not created",
                status: "Not created error",
            });
        }
        yield userModel_1.User.deleteOne({ _id: user_id });
        return res.status(200).json({
            message: "User is deleted",
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during deleting a user";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.deleteUser = deleteUser;
