interface UserRequestBody {
  username?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

import { Request, Response, NextFunction } from "express";
const validator = require("validator");
export function validateUserFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestBody: UserRequestBody = req.body;
  const { username, email, mobile, password, confirmPassword } = requestBody;
  const missingFields: string[] = [];

  if (!username) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!mobile) missingFields.push("mobile");
  if (!password) missingFields.push("password");
  if (!confirmPassword) missingFields.push("confirm password");
  if (password !== confirmPassword)
    missingFields.push("Password and confirmPassword do not match");
  if (!validator.isEmail(email)) missingFields.push("Invalid email format");
  if (missingFields?.length > 0) {
    return res.status(400).json({
      success: false,
      message: `The following fields are missing or empty: ${missingFields.join(
        ", "
      )}`,
    });
  }

  next();
}

// LOGIN MIDDLEWARE

export function validateUserLoginFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestBody: UserRequestBody = req.body;
  const { email, password } = requestBody;
  const missingFields: string[] = [];

  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (missingFields?.length > 0) {
    return res.status(400).json({
      success: false,
      message: `The following fields are missing or empty: ${missingFields.join(
        ", "
      )}`,
    });
  }

  next();
}
