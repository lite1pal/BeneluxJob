"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidator = exports.signingUserGoogleValidator = exports.signinUserValidator = exports.getUserValidator = exports.createUserValidator = exports.validatePassword = void 0;
const express_validator_1 = require("express-validator");
const validatePassword = (password) => {
    // Check if password is at least 8 characters long
    if (password.length < 8) {
        return false;
    }
    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }
    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    // Check if password contains at least one digit
    if (!/\d/.test(password)) {
        return false;
    }
    // Check if password contains at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
        return false;
    }
    // If all checks pass, return true
    return true;
};
exports.validatePassword = validatePassword;
exports.createUserValidator = [
    (0, express_validator_1.body)("first_name").isString().notEmpty(),
    (0, express_validator_1.body)("last_name").isString().notEmpty(),
    (0, express_validator_1.body)("email").isEmail().notEmpty(),
    (0, express_validator_1.body)("age").isNumeric().notEmpty(),
    (0, express_validator_1.body)("phone_number").isMobilePhone("uk-UA").notEmpty(),
    (0, express_validator_1.body)("password").isString().notEmpty(),
];
exports.getUserValidator = (0, express_validator_1.param)("user_id").isString().notEmpty();
exports.signinUserValidator = [
    (0, express_validator_1.body)("email").isEmail().notEmpty(),
    (0, express_validator_1.body)("password").isString().notEmpty(),
];
exports.signingUserGoogleValidator = (0, express_validator_1.body)("googleToken")
    .isString()
    .notEmpty();
exports.deleteUserValidator = (0, express_validator_1.param)("user_id").isString().notEmpty();
