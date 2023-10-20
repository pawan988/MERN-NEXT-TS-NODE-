const userMongoose = require("mongoose");
const validator = require("validator");
import { NextFunction } from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User Schema

const userSchema = new userMongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) =>
        validator.isMobilePhone(value, "any", { strictMode: false }),
      message: "Invalid mobile number",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  // resetPasswordToken: String,
  // resetPasswordExpire: Date,
});

// BCRYPT PASSWORD

userSchema.pre("save", async function (this: any, next: NextFunction) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// COMPARE PASSWORD

userSchema.methods.comparePassword = async function (password: any) {
  return await bcrypt.compare(password, this.password);
};

module.exports = userMongoose.model("User", userSchema);
