import { Request, Response, NextFunction } from "express";

const UserModal = require("../models/userModal");

// USER REGISTRATION

export const userRegiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, mobile, password, confirmPassword, avatar, role } =
      req.body;
    const existingUser = await UserModal.findOne({ email, mobile });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already exists.",
      });
    }
    const userData = new UserModal({
      username,
      email,
      mobile,
      password,
      confirmPassword,
      avatar,
      role,
    });
    const user = await userData.save();
    return res.status(201).json({
      success: true,
      message: "User Registration success.",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
