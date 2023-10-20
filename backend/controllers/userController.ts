import { Request, Response, NextFunction } from "express";
import { sendToken } from "../utils/jwtTokens";
const User = require("../models/userModal");

// USER REGISTRATION

export const userRegiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, mobile, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already exists.",
      });
    }
    const userData = new User({
      username,
      email,
      mobile,
      password,
      role,
      avatar: {
        public_id: "this is sample id",
        url: "profilepicurl",
      },
    });
    const user = await userData.save();

    const token = user.getJWTToken();

    sendToken(user, 201, res, "User Registration success.");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// USER LOGIN

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist. Please register.",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password or email.",
      });
    }

    sendToken(user, 200, res, "Login successful.");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// USER LOGOUT
export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("token", null, {
      maxAge: 0, // Set maxAge to 0 to delete the cookie
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
