import { Request, Response } from "express";
import { Application } from "../models/applicationModel";

export const createApplication = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { first_name, last_name, age, phone_number, email, additionalList } =
      req.body;

    const { job_id } = req.query;

    const newApplication = await Application.create({
      first_name,
      last_name,
      age,
      phone_number,
      email,
      additionalList,
      job_id,
    });

    return res.status(200).json({
      message: "Application is created",
      result: newApplication,
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during creating an application";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const updateApplication = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { application_id } = req.params;
    const updatedApplication = await Application.updateOne(
      { _id: application_id },
      { $set: req.body }
    );
    return res.status(200).json({
      message: "Application is updated",
      result: updatedApplication,
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during updating an application";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const getApplication = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { application_id } = req.params;
    const application = await Application.findById(application_id);
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
  } catch (err) {
    const message = "Error occured during getting an application";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const getApplications = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const applications = await Application.find();
    return res.status(200).json({
      message: "Applications are got",
      result: applications,
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during getting applications";
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const deleteApplication = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { application_id } = req.params;
    const deletedCount = await Application.deleteOne({ _id: application_id });

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
  } catch (err) {
    const message = "Error occured during deleting an application";
    console.error(message, err);
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};

export const deleteApplications = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Application.deleteMany({});
    return res.status(200).json({
      message: "Applications are deleted",
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during deleting applications";
    return res.status(500).json({
      message,
      status: "Server error",
    });
  }
};
