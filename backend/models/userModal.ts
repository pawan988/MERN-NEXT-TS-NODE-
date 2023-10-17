const userMongoose = require("mongoose");
const validator = require("validator");

// Define the User Schema
const userSchema = new mongoose.Schema({
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
      validator: (value: number) =>
        validator.isMobilePhone(value, "any", { strictMode: false }),
      message: "Invalid mobile number",
    },
  },
  password: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 30,
  },
  confirmPassword: {
    type: Number,
    required: true,
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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const User = userMongoose.model("User", userSchema);

module.exports = User;
