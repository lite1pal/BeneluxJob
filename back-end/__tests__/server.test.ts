import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_CONNECT_STRING!);
});
afterEach(async () => {
  await mongoose.disconnect();
});

describe("Job actions", () => {
  let createdId: string;
  it("should create a job", async () => {
    const response = await request(app).post("/jobs/create").send({
      name: "porter",
      description: "hard work",
      salary: 10,
      hot: true,
      withLivingHouse: false,
      withoutLanguage: true,
    });
    expect(response.statusCode).toEqual(200);
    createdId = response.body.result._id;
  });
  it("should update a job", async () => {
    const response = await request(app)
      .put(`/jobs/update/${createdId}`)
      .send({ salary: 20, description: "easy work" });
    expect(response.statusCode).toEqual(200);
  });
  it("should retrieve a job", async () => {
    const response = await request(app).get(`/jobs/${createdId}`);
    expect(response.statusCode).toEqual(200);
  });
  it("should delete a job", async () => {
    const response = await request(app).delete(`/jobs/delete/${createdId}`);
    expect(response.statusCode).toEqual(200);
  });
});
