// imports packages and modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

// imports routers
import { jobRouter } from "./routes/jobRouter";
import { applicationRouter } from "./routes/applicationRouter";
import { userRouter } from "./routes/userRouter";

// creates an express app
export const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());

// listens to middleware functions
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: true,
    },
  })
);

app.use("/jobs", jobRouter);
app.use("/applications", applicationRouter);
app.use("/users", userRouter);
