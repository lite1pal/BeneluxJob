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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplication = exports.getApplication = exports.updateApplication = exports.createApplication = void 0;
const applicationModel_1 = require("../models/applicationModel");
const createApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, age, phone_number, email, additionalList } = req.body;
        const newApplication = yield applicationModel_1.Application.create({
            first_name,
            last_name,
            age,
            phone_number,
            email,
            additionalList,
        });
        return res.status(200).json({
            message: "Application is created",
            result: newApplication,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during creating an application";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.createApplication = createApplication;
const updateApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { application_id } = req.params;
        const updatedApplication = yield applicationModel_1.Application.updateOne({ _id: application_id }, { $set: req.body });
        return res.status(200).json({
            message: "Application is updated",
            result: updatedApplication,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during updating an application";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.updateApplication = updateApplication;
const getApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { application_id } = req.params;
        const application = yield applicationModel_1.Application.findById(application_id);
        if (!application) {
            return res.status(404).json({
                message: "Not found an application",
                status: "Not found error",
            });
        }
        return res.status(200).json({
            message: "Application is got",
            result: application,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during getting an application";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.getApplication = getApplication;
const deleteApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { application_id } = req.params;
        const deletedCount = yield applicationModel_1.Application.deleteOne({ _id: application_id });
        if (deletedCount.deletedCount === 0) {
            return res.status(404).json({
                message: "Application does not exist",
                status: "Not found error",
            });
        }
        return res.status(200).json({
            message: "Application is deleted",
            result: deletedCount,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during deleting an application";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.deleteApplication = deleteApplication;
