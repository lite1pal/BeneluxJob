"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// imports packages and modules
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// imports routers
const jobRouter_1 = require("./routes/jobRouter");
// creates an express app
exports.app = (0, express_1.default)();
// parses incoming requests with JSON payloads
exports.app.use(express_1.default.json());
// listens to middleware functions
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use("/jobs", jobRouter_1.jobRouter);
