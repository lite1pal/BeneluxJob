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
let createdUserId;
let jwtToken;
let adminJwtToken;
let createdJobId;
let createdApplicationId;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGODB_CONNECT_STRING);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe("User actions", () => {
    it("should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post("/users/create").send({
            first_name: "test_name",
            last_name: "test_name",
            email: "test@gmail.com",
            age: 100,
            phone_number: "0931230565",
            password: "Test12345",
        });
        expect(response.statusCode).toEqual(200);
        createdUserId = response.body.result._id;
    }));
    it("should sign in a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/users/signin")
            .send({ email: "test@gmail.com", password: "Test12345" });
        const responseAdmin = yield (0, supertest_1.default)(app_1.app)
            .post("/users/signin")
            .send({ email: "admin@gmail.com", password: "=cfL9tMqJXqE>yV" });
        expect(response.statusCode).toEqual(200);
        jwtToken = response.body.result.jwtToken;
        adminJwtToken = responseAdmin.body.result.jwtToken;
    }));
    it("should delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/users/delete/${createdUserId}`)
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
    }));
});
describe("Job actions", () => {
    it("should create a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post("/jobs/create")
            .send({
            name: "porter",
            description: "hard work",
            salary: 10,
            hot: true,
            withLivingHouse: false,
            withoutLanguage: true,
        })
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
        createdJobId = response.body.result._id;
    }));
    it("should update a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`/jobs/update/${createdJobId}`)
            .send({ salary: 20, description: "easy work" })
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
    }));
    it("should retrieve a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get(`/jobs/${createdJobId}`)
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
    }));
    it("should delete a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/jobs/delete/${createdJobId}`)
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
    }));
    describe("Get a job errors", () => {
        it("should return status 404 if a job with such id is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/jobs/${createdJobId}`)
                .set({ Authorization: `Bearer ${adminJwtToken}` });
            expect(response.statusCode).toEqual(404);
            expect(response.body.message).toEqual("Not found a job");
        }));
        it("should return status 500 if a function with await went wrong", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/jobs/1`)
                .set({ Authorization: `Bearer ${adminJwtToken}` });
            expect(response.statusCode).toEqual(500);
        }));
    });
    describe("Update a job errors", () => {
        it("should return status 500 if a function with await went wrong", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/jobs/update/1`)
                .send({ salary: 20, description: "easy work" })
                .set({ Authorization: `Bearer ${adminJwtToken}` });
            expect(response.statusCode).toEqual(500);
        }));
        it("should return status 404 if a job with such id is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/jobs/update/${createdJobId}`)
                .send({ salary: 20, description: "easy work" })
                .set({ Authorization: `Bearer ${adminJwtToken}` });
            expect(response.statusCode).toEqual(404);
            expect(response.body.message).toEqual("Not found a job");
        }));
    });
});
describe("Application actions", () => {
    it("should create an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseJob = yield (0, supertest_1.default)(app_1.app)
            .post("/jobs/create")
            .send({
            name: "porter",
            description: "hard work",
            salary: 10,
            hot: true,
            withLivingHouse: false,
            withoutLanguage: true,
        })
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        createdJobId = responseJob.body.result._id;
        const response = yield (0, supertest_1.default)(app_1.app)
            .post(`/applications/create?job_id=${createdJobId}`)
            .send({
            first_name: "Andrzej",
            last_name: "Sapkowski",
            age: 75,
            email: "andrzej_sapkowski@ukr.net",
            phone_number: "0931230565",
        })
            .set({ Authorization: `Bearer ${jwtToken}` });
        expect(response.statusCode).toEqual(200);
        createdApplicationId = response.body.result._id;
    }));
    it("should update an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`/applications/update/${createdApplicationId}`)
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
    }));
    it("should get an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .get(`/applications/${createdApplicationId}`)
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
    }));
    it("should delete an application", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/applications/delete/${createdApplicationId}`)
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(response.statusCode).toEqual(200);
        const responseJob = yield (0, supertest_1.default)(app_1.app)
            .delete(`/jobs/delete/${createdJobId}`)
            .set({ Authorization: `Bearer ${adminJwtToken}` });
        expect(responseJob.statusCode).toEqual(200);
    }));
});
