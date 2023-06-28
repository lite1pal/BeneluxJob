import { ValidationChain, body, param } from "express-validator";

export const createJobValidator: ValidationChain[] = [
  body("name").isString().notEmpty(),
  body("description").isString().notEmpty(),
  body("salary").isNumeric().notEmpty(),
  body("hot").isBoolean().notEmpty(),
  body("withLivingHouse").isBoolean().notEmpty(),
  body("withoutLanguage").isBoolean().notEmpty(),
];

export const updateJobValidator: ValidationChain[] = [
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("salary").optional().isNumeric(),
  body("hot").optional().isBoolean(),
  body("withLivingHouse").optional().isBoolean(),
  body("withoutLanguage").optional().isBoolean(),
  param("job_id").isString().notEmpty(),
];

export const getJobValidator: ValidationChain = param("job_id")
  .isString()
  .notEmpty();

export const deleteJobValidator: ValidationChain = param("job_id")
  .isString()
  .notEmpty();
