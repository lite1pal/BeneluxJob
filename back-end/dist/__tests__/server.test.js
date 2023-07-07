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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGODB_CONNECT_STRING);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe("Job actions", () => {
    let createdJobId;
    it("should create a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post("/jobs/create").send({
            name: "porter",
            description: "hard work",
            salary: 10,
            hot: true,
            withLivingHouse: false,
            withoutLanguage: true,
        });
        expect(response.statusCode).toEqual(200);
        createdJobId = response.body.result._id;
    }));
    it("should update a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`/jobs/update/${createdJobId}`)
            .send({ salary: 20, description: "easy work" });
        expect(response.statusCode).toEqual(200);
    }));
    it("should retrieve a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/jobs/${createdJobId}`);
        expect(response.statusCode).toEqual(200);
    }));
    it("should delete a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).delete(`/jobs/delete/${createdJobId}`);
        expect(response.statusCode).toEqual(200);
    }));
});
describe("Application actions", () => {
    let createdApplicationId;
    it("should create an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post("/applications/create").send({
            first_name: "Andrzej",
            last_name: "Sapkowski",
            age: 75,
            email: "andrzej_sapkowski@ukr.net",
            phone_number: "0931230565",
        });
        expect(response.statusCode).toEqual(200);
        createdApplicationId = response.body.result._id;
    }));
    it("should update an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).put(`/applications/update/${createdApplicationId}`);
        expect(response.statusCode).toEqual(200);
    }));
    it("should get an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/applications/${createdApplicationId}`);
        expect(response.statusCode).toEqual(200);
    }));
    it("should delete an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).delete(`/applications/delete/${createdApplicationId}`);
        expect(response.statusCode).toEqual(200);
    }));
});
