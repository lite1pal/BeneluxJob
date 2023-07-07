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
exports.deleteJobs = exports.deleteJob = exports.getJobs = exports.getJob = exports.updateJob = exports.createJob = void 0;
const jobModel_1 = require("../models/jobModel");
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructures values from req.body
        const { name, description, salary, hot, withLivingHouse, withoutLanguage } = req.body;
        // creates a new job in MongoDB
        const newJob = yield jobModel_1.Job.create({
            name,
            description,
            salary,
            hot,
            withLivingHouse,
            withoutLanguage,
        });
        // returns response with status 200 if job is created without any errors
        return res.status(200).json({
            message: "Job is created",
            result: newJob,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during creating a job";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.createJob = createJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { job_id } = req.params;
        const updatedJob = yield jobModel_1.Job.updateOne({ _id: job_id }, { $set: req.body });
        return res.status(200).json({
            message: "Job is updated",
            result: updatedJob,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during updating a job";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.updateJob = updateJob;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { job_id } = req.params;
        const job = yield jobModel_1.Job.findById(job_id);
        if (!job) {
            return res
                .status(404)
                .json({ message: "Not found a job", status: "Not found error" });
        }
        return res
            .status(200)
            .json({ message: "Job is got", result: job, status: "Success" });
    }
    catch (err) {
        const message = "Error occured during getting a job";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.getJob = getJob;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobModel_1.Job.find({});
        return res.status(200).json({
            message: "Jobs are got",
            result: jobs,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured durring getting jobs";
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.getJobs = getJobs;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { job_id } = req.params;
        const deletedCount = yield jobModel_1.Job.deleteOne({
            _id: job_id,
        });
        if (deletedCount.deletedCount === 0) {
            return res.status(404).json({
                message: "Job does not exist",
                status: "Not found error",
            });
        }
        return res.status(200).json({
            message: "Job is deleted",
            result: deletedCount,
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during deleting a job";
        console.error(message, err);
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.deleteJob = deleteJob;
const deleteJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jobModel_1.Job.deleteMany({});
        return res.status(200).json({
            message: "Jobs are deleted",
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during deleting jobs";
        return res.status(500).json({
            message,
            status: "Server error",
        });
    }
});
exports.deleteJobs = deleteJobs;
