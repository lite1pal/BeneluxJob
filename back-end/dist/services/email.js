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
exports.sendEmail = void 0;
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        transporter.sendMail({
            from: "deniskatarasenko6@gmail.com",
            to: "6865527@stud.nau.edu.ua",
            subject: "Test message subject",
            text: "Hello world!",
            html: "<b>Hello world!</b>", // html body
        }, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
        return res.status(200).json({
            message: "Email is sent",
            status: "Success",
        });
    }
    catch (err) {
        const message = "Error occured during sending an email";
        return res.status(500).json({
            message,
            err,
            status: "Server error",
        });
    }
});
exports.sendEmail = sendEmail;
