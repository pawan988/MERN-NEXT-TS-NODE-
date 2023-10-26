import { Request, Response, NextFunction } from "express";
import { sendToken } from "../utils/jwtTokens";
const User = require("../models/userModal");
import { sendEmail } from "../utils/sendEmail";
const crypto = require("crypto");

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
      return res.status(404).json({
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
      maxAge: 0,
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

// FORGOT PASSWORD

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist.",
      });
    }
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
    const message = `We've received a request to reset your password. To proceed with this reset, please click on the link below:- \n\n ${resetPasswordUrl} \n\n If you didn't initiate this password reset, simply disregard this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Ecommerce password recivery.",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully.`,
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).json({ message: err });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// CHANGE PASSWORD

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Reset password token is invalid or has been expired.",
      });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Paswsord dosen't match.",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET USER DETAIL

export const getUserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User retrive success.", user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// UPDATE PASSWORD
export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password confirmation does not match the new password",
      });
    }

    user.password = newPassword;
    await user.save();
    sendToken(user, 200, res, "Password has been successfully updated.");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
