import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let createdUserId: string;
let jwtToken: string;
let createdJobId: string;
let createdApplicationId: string;

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_CONNECT_STRING!);
});
afterEach(async () => {
  await mongoose.disconnect();
});

describe("User actions", () => {
  it("should create a user", async () => {
    const response = await request(app).post("/users/create").send({
      first_name: "test_name",
      last_name: "test_name",
      email: "test@gmail.com",
      age: 100,
      phone_number: "0931230565",
      password: "Test12345",
    });
    expect(response.statusCode).toEqual(200);
    createdUserId = response.body.result._id;
  });
  it("should sign in a user", async () => {
    const response = await request(app)
      .post("/users/signin")
      .send({ email: "test@gmail.com", password: "Test12345" });
    expect(response.statusCode).toEqual(200);
    jwtToken = response.body.result.jwtToken;
  });
  it("should delete a user", async () => {
    const response = await request(app).delete(
      `/users/delete/${createdUserId}`
    );
    expect(response.statusCode).toEqual(200);
  });
});

describe("Job actions", () => {
  it("should create a job", async () => {
    const response = await request(app)
      .post("/jobs/create")
      .send({
        name: "porter",
        description: "hard work",
        salary: 10,
        hot: true,
        withLivingHouse: false,
        withoutLanguage: true,
      })
      .set({ Authorization: `Bearer ${jwtToken}` });
    expect(response.statusCode).toEqual(200);
    createdJobId = response.body.result._id;
  });
  it("should update a job", async () => {
    const response = await request(app)
      .put(`/jobs/update/${createdJobId}`)
      .send({ salary: 20, description: "easy work" })
      .set({ Authorization: `Bearer ${jwtToken}` });
    expect(response.statusCode).toEqual(200);
  });
  it("should retrieve a job", async () => {
    const response = await request(app)
      .get(`/jobs/${createdJobId}`)
      .set({ Authorization: `Bearer ${jwtToken}` });
    expect(response.statusCode).toEqual(200);
  });
  it("should delete a job", async () => {
    const response = await request(app)
      .delete(`/jobs/delete/${createdJobId}`)
      .set({ Authorization: `Bearer ${jwtToken}` });
    expect(response.statusCode).toEqual(200);
  });
  describe("Get a job errors", () => {
    it("should return status 404 if a job with such id is missing", async () => {
      const response = await request(app)
        .get(`/jobs/${createdJobId}`)
        .set({ Authorization: `Bearer ${jwtToken}` });
      expect(response.statusCode).toEqual(404);
      expect(response.body.message).toEqual("Not found a job");
    });
    it("should return status 500 if a function with await went wrong", async () => {
      const response = await request(app)
        .get(`/jobs/1`)
        .set({ Authorization: `Bearer ${jwtToken}` });
      expect(response.statusCode).toEqual(500);
    });
  });
  describe("Update a job errors", () => {
    it("should return status 500 if a function with await went wrong", async () => {
      const response = await request(app)
        .put(`/jobs/update/1`)
        .send({ salary: 20, description: "easy work" })
        .set({ Authorization: `Bearer ${jwtToken}` });
      expect(response.statusCode).toEqual(500);
    });
    it("should return status 404 if a job with such id is missing", async () => {
      const response = await request(app)
        .put(`/jobs/update/${createdJobId}`)
        .send({ salary: 20, description: "easy work" })
        .set({ Authorization: `Bearer ${jwtToken}` });
      expect(response.statusCode).toEqual(404);
      expect(response.body.message).toEqual("Not found a job");
    });
  });
});

describe("Application actions", () => {
  it("should create an application", async () => {
    const responseJob = await request(app)
      .post("/jobs/create")
      .send({
        name: "porter",
        description: "hard work",
        salary: 10,
        hot: true,
        withLivingHouse: false,
        withoutLanguage: true,
      })
      .set({ Authorization: `Bearer ${jwtToken}` });
    createdJobId = responseJob.body.result._id;
    const response = await request(app)
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
  });
  it("should update an application", async () => {
    const response = await request(app)
      .put(`/applications/update/${createdApplicationId}`)
      .set({ Authorization: `Bearer ${jwtToken}` });
    expect(response.statusCode).toEqual(200);
  });
  it("should get an application", async () => {
    const response = await request(app)
      .get(`/applications/${createdApplicationId}`)
      .set({ Authorization: `Bearer ${jwtToken}` });
    expect(response.statusCode).toEqual(200);
  });
  it("should delete an application", async () => {
    const response = await request(app)
      .delete(`/applications/delete/${createdApplicationId}`)
      .set({ Authorization: `Bearer ${jwtToken}` });
    expect(response.statusCode).toEqual(200);
    await request(app).delete(`/jobs/delete/${createdJobId}`);
  });
});
