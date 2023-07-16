import { body, param, query } from "express-validator";

export const createApplicationValidator = [
  body("first_name").isString().notEmpty().isLength({ max: 12 }),
  body("last_name").isString().notEmpty().isLength({ max: 15 }),
  body("age").isNumeric().notEmpty().isLength({ max: 99 }),
  body("phone_number").isMobilePhone("uk-UA").notEmpty(),
  body("email").isEmail().notEmpty(),
  body("additionalList").optional().isString().isLength({ max: 100 }),
  query("job_id").isString().notEmpty(),
];

export const updateApplicationValidator = [
  param("application_id").isString().notEmpty(),
  body("first_name").optional().isString().notEmpty().isLength({ max: 12 }),
  body("last_name").optional().isString().notEmpty().isLength({ max: 15 }),
  body("age").optional().isNumeric().notEmpty().isLength({ max: 99 }),
  body("phone_number").optional().isMobilePhone("uk-UA").notEmpty(),
  body("email").isEmail().optional().notEmpty(),
  body("additionalList").optional().isString().isLength({ max: 100 }),
];

export const getApplicationValidator = param("application_id")
  .isString()
  .notEmpty();

export const deleteApplicationValidator = param("application_id")
  .isString()
  .notEmpty();
