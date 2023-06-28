// imports packages and modules
import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";

// imports routers
import { jobRouter } from "./routes/jobRouter";

// creates an express app
export const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());

// listens to middleware functions
app.use(morgan("dev"));

app.use("/jobs", jobRouter);
