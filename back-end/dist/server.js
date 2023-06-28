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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.app);
const PORT = process.env.SERVER_PORT || 4001;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_CONNECT_STRING);
        console.log("MongoDB is connected");
        const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                server.close(() => {
                    console.log("Server is closed");
                    process.exit(0);
                });
            }
            catch (err) {
                console.error("Error occurred during shutdown:", err);
                process.exit(1);
            }
        });
        // Handle termination signals (e.g., Ctrl+C)
        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
        server.listen(PORT, () => {
            console.log(`Server is on ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`);
        });
    }
    catch (err) {
        console.error("Error occurred during server startup:", err);
        process.exit(1);
    }
});
startServer();
