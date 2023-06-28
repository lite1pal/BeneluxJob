import http from "http";
import { app } from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const server = http.createServer(app);

const PORT = (process.env.SERVER_PORT as unknown as number) || 4001;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING!);
    console.log("MongoDB is connected");

    const shutdown = async () => {
      try {
        await mongoose.disconnect();
        server.close(() => {
          console.log("Server is closed");
          process.exit(0);
        });
      } catch (err) {
        console.error("Error occurred during shutdown:", err);
        process.exit(1);
      }
    };

    // Handle termination signals (e.g., Ctrl+C)
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    server.listen(PORT, () => {
      console.log(
        `Server is on ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
      );
    });
  } catch (err: any) {
    console.error("Error occurred during server startup:", err);
    process.exit(1);
  }
};

startServer();
