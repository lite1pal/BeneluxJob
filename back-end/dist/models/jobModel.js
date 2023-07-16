"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    hot: { type: Boolean, required: true, default: false },
    withLivingHouse: { type: Boolean, required: true, default: false },
    withoutLanguage: { type: Boolean, required: true, default: false },
    withoutExp: { type: Boolean, required: true, default: false },
}, { timestamps: true });
exports.Job = mongoose_1.default.model("Job", jobSchema);
