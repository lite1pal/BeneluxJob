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
exports.deleteUsers = exports.deleteUser = exports.getUser = exports.signinUserGoogle = exports.signinUser = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const google_1 = require("../services/google");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, age, phone_number, password, key } = req.body;
        let { admin } = req.body;
        if (key !== process.env.ADMINKEY) {
            admin = false;
        }
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
            admin,
        });
        const { _id } = newUser;
        return res.status(200).json({
            message: "User is created",
            result: { _id },
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
        const { first_name, last_name, age, phone_number, admin, _id } = existingUser;
        const user = {
            first_name,
            last_name,
            email,
            age,
            phone_number,
            admin,
            _id,
        };
        if (!isPasswordTheSame) {
            return res.status(403).json({
                message: "Password is incorrect",
                status: "Authorization error",
            });
        }
        yield userModel_1.User.updateOne({ email }, { sessionID: req.sessionID });
        const jwtToken = jsonwebtoken_1.default.sign({ email, _id, admin }, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "User is signed in",
            result: { user, jwtToken },
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
                hashedPassword: googleUser.sub,
            });
            const { email, admin } = newUser;
            user = { email, admin };
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
        const foundUser = yield userModel_1.User.findById(user_id);
        if (!foundUser) {
            return res.status(404).json({
                message: "Not found a user",
                status: "Not found error",
            });
        }
        const { first_name, last_name, age, email, phone_number, admin, sessionID, } = foundUser;
        const user = {
            first_name,
            last_name,
            age,
            email,
            phone_number,
            admin,
            sessionID,
        };
        console.log(user);
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
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.User.deleteMany({});
        return res.status(200).json({
            message: "User are deleted",
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during deleting users";
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.deleteUsers = deleteUsers;
