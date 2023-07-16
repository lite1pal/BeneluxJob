"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplicationValidator = exports.getApplicationValidator = exports.updateApplicationValidator = exports.createApplicationValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createApplicationValidator = [
    (0, express_validator_1.body)("first_name").isString().notEmpty().isLength({ max: 12 }),
    (0, express_validator_1.body)("last_name").isString().notEmpty().isLength({ max: 15 }),
    (0, express_validator_1.body)("age").isNumeric().notEmpty().isLength({ max: 99 }),
    (0, express_validator_1.body)("phone_number").isMobilePhone("uk-UA").notEmpty(),
    (0, express_validator_1.body)("email").isEmail().notEmpty(),
    (0, express_validator_1.body)("additionalList").optional().isString().isLength({ max: 100 }),
    (0, express_validator_1.query)("job_id").isString().notEmpty(),
];
exports.updateApplicationValidator = [
    (0, express_validator_1.param)("application_id").isString().notEmpty(),
    (0, express_validator_1.body)("first_name").optional().isString().notEmpty().isLength({ max: 12 }),
    (0, express_validator_1.body)("last_name").optional().isString().notEmpty().isLength({ max: 15 }),
    (0, express_validator_1.body)("age").optional().isNumeric().notEmpty().isLength({ max: 99 }),
    (0, express_validator_1.body)("phone_number").optional().isMobilePhone("uk-UA").notEmpty(),
    (0, express_validator_1.body)("email").isEmail().optional().notEmpty(),
    (0, express_validator_1.body)("additionalList").optional().isString().isLength({ max: 100 }),
];
exports.getApplicationValidator = (0, express_validator_1.param)("application_id")
    .isString()
    .notEmpty();
exports.deleteApplicationValidator = (0, express_validator_1.param)("application_id")
    .isString()
    .notEmpty();
