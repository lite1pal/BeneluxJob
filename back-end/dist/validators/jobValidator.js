"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobValidator = exports.getJobValidator = exports.updateJobValidator = exports.createJobValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createJobValidator = [
    (0, express_validator_1.body)("name").isString().notEmpty(),
    (0, express_validator_1.body)("description").isString().notEmpty(),
    (0, express_validator_1.body)("salary").isNumeric().notEmpty(),
    (0, express_validator_1.body)("hot").isBoolean().notEmpty(),
    (0, express_validator_1.body)("withLivingHouse").isBoolean().notEmpty(),
    (0, express_validator_1.body)("withoutLanguage").isBoolean().notEmpty(),
];
exports.updateJobValidator = [
    (0, express_validator_1.body)("name").optional().isString(),
    (0, express_validator_1.body)("description").optional().isString(),
    (0, express_validator_1.body)("salary").optional().isNumeric(),
    (0, express_validator_1.body)("hot").optional().isBoolean(),
    (0, express_validator_1.body)("withLivingHouse").optional().isBoolean(),
    (0, express_validator_1.body)("withoutLanguage").optional().isBoolean(),
    (0, express_validator_1.param)("job_id").isString().notEmpty(),
];
exports.getJobValidator = (0, express_validator_1.param)("job_id")
    .isString()
    .notEmpty();
exports.deleteJobValidator = (0, express_validator_1.param)("job_id")
    .isString()
    .notEmpty();
