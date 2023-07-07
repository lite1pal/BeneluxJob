import sgMail from "@sendgrid/mail";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
    // sgMail.setApiKey(SENDGRID_API_KEY);
    // const msg = {
    //   to: "deniskatarasenko6@gmail.com", // Change to your recipient
    //   from: "deniskatarasenko6@gmail.com", // Change to your verified sender
    //   subject: "Sending with SendGrid is Fun",
    //   text: "and easy to do anywhere, even with Node.js",
    //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    // };
    // const result = await sgMail.send(msg);
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    transporter.sendMail(
      {
        from: "deniskatarasenko6@gmail.com", // verified sender email
        to: "6865527@stud.nau.edu.ua", // recipient email
        subject: "Test message subject", // Subject line
        text: "Hello world!", // plain text body
        html: "<b>Hello world!</b>", // html body
      },
      function (error: any, info: any) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    return res.status(200).json({
      message: "Email is sent",
      status: "Success",
    });
  } catch (err) {
    const message = "Error occured during sending an email";
    return res.status(500).json({
      message,
      err,
      status: "Server error",
    });
  }
};
