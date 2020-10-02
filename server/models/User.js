const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 32,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    profile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    photo: {
      type: {
        url: {
          type: String,
          required: true,
        },
        key: {
          type: String,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash user's password before saving
userSchema.pre("save", async function (next) {
  if (!(this.isNew || this.isModified("password"))) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Check if given plain text passowd matches saved hash
userSchema.methods.isCorrectPassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

// Generate a token for user
userSchema.methods.genJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", userSchema);
