import { Request, Response } from "express";
import { Job } from "../models/jobModel";
import { Application } from "../models/applicationModel";

export const createJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // destructures values from req.body
    const {
      name,
      description,
      salary,
      hot,
      withLivingHouse,
      withoutLanguage,
      withoutExp,
    } = req.body;

    // creates a new job in MongoDB
    const newJob = await Job.create({
      name,
      description,
      salary,
      hot,
      withLivingHouse,
      withoutLanguage,
      withoutExp,
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

    const updatedJob = await Job.updateOne({ _id: job_id }, { $set: req.body });
    if (updatedJob.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Not found a job", status: "Not found error" });
    }
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

export const getJobs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const pageNumber: number = parseInt(req.query.page as string);
    const search = req.query.search as string;
    const salaryLevelFilter = req.query.salaryLevelFilter;
    const createdAtFilter = req.query.createdAtFilter as string;

    const filterSettings =
      !salaryLevelFilter && createdAtFilter.length === 0
        ? {}
        : { salary: { $gt: salaryLevelFilter } };

    let jobs;
    search.length > 0
      ? (jobs = await Job.find({ name: { $regex: search, $options: "i" } }))
      : (jobs = await Job.find(filterSettings)
          .skip(pageNumber * 10)
          .limit(10));

    // operation to figure out if there are more jobs
    const nextJobs = await Job.find(filterSettings)
      .skip((pageNumber + 1) * 10)
      .limit(10);
    const hasMoreJobs = nextJobs.length > 0;

    return res.status(200).json({
      message: "Jobs are got",
      result: { jobs, hasMoreJobs },
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured durring getting jobs";
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

    const deletedCount = await Job.deleteOne({
      _id: job_id,
    });

    await Application.deleteMany({ job_id });

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
  } catch (err) {
    const message = "Error occured during deleting a job";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const deleteJobs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Job.deleteMany({});
    return res.status(200).json({
      message: "Jobs are deleted",
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during deleting jobs";
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};
