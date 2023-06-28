import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Job } from "../models/jobModel";
import mongoose, { ObjectId } from "mongoose";

export const createJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // destructures values from req.body
    const { name, description, salary, hot, withLivingHouse, withoutLanguage } =
      req.body;

    // extracts the validation errors of an express request
    const validationErrors = validationResult(req);

    // returns response with status 400 if there were any errors during input validation
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: validationErrors,
        status: "Validation error",
      });
    }

    // creates a new job in MongoDB
    const newJob = await Job.create({
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
  } catch (err) {
    const message = "Error occured during creating a job";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const updateJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { job_id } = req.params;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: validationErrors,
        status: "Validation error",
      });
    }

    const updatedJob = await Job.updateOne({ _id: job_id }, { $set: req.body });
    return res.status(200).json({
      message: "Job is updated",
      result: updatedJob,
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during updating a job";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const getJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { job_id } = req.params;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(400)
        .json({ message: validationErrors, status: "Validation error" });
    }
    const job = await Job.findById(job_id);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Not found a job", status: "Not found error" });
    }
    return res
      .status(200)
      .json({ message: "Job is got", result: job, status: "Success" });
  } catch (err) {
    const message = "Error occured during getting a job";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const deleteJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { job_id } = req.params;

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: validationErrors,
        status: "Validation error",
      });
    }

    const deletedJob = await Job.deleteOne({
      _id: job_id,
    });

    return res.status(200).json({
      message: "Job is deleted",
      result: deletedJob,
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during deleting a job";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};
