"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// imports packages and modules
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// imports routers
const jobRouter_1 = require("./routes/jobRouter");
const applicationRouter_1 = require("./routes/applicationRouter");
const userRouter_1 = require("./routes/userRouter");
// creates an express app
exports.app = (0, express_1.default)();
// parses incoming requests with JSON payloads
exports.app.use(express_1.default.json());
// listens to middleware functions
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use((0, cors_1.default)());
exports.app.use((0, helmet_1.default)());
exports.app.use((0, express_session_1.default)({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: true,
    },
}));
exports.app.use("/jobs", jobRouter_1.jobRouter);
exports.app.use("/applications", applicationRouter_1.applicationRouter);
exports.app.use("/users", userRouter_1.userRouter);
