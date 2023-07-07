import { body, param } from "express-validator";

export const validatePassword = (password: string): boolean => {
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

export const createUserValidator = [
  body("first_name").isString().notEmpty(),
  body("last_name").isString().notEmpty(),
  body("email").isEmail().notEmpty(),
  body("age").isNumeric().notEmpty(),
  body("phone_number").isMobilePhone("uk-UA").notEmpty(),
  body("password").isString().notEmpty(),
];

export const getUserValidator = param("user_id").isString().notEmpty();

export const signinUserValidator = [
  body("email").isEmail().notEmpty(),
  body("password").isString().notEmpty(),
];

export const signingUserGoogleValidator = body("googleToken")
  .isString()
  .notEmpty();

export const deleteUserValidator = param("user_id").isString().notEmpty();
