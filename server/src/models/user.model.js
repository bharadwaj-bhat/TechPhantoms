const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const signupSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    tokens: [{ token: { type: String, required: false } }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

signupSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);

    this.confirm_password = await bcrypt.hash(this.confirm_password, 12);
  }
  next();
});

signupSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
const User = mongoose.model("user", signupSchema);
module.exports = User;
