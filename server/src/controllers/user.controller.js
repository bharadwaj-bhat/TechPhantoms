const express = require("express");
const User = require("../models/user.model");
require("../config/db");
const router = express.Router();

router.post("/", async (req, res) => {
  const { user_name, email, password, confirm_password } = req.body;
  if (!user_name || !email || !password || !confirm_password) {
    return res.status(422).json({ error: "please fill all the data" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Allrady user Exist" });
    }

    const user = new User({ user_name, email, password, confirm_password });
    await user.save();
    res.status(201).json({ message: "user register sucessfully" });
  } catch (err) {
    console.log(err, "error");
  }
});

router.get("/", async (req, res) => {
  const user = await User.find().lean().exec();
  res.status(200).json({ user });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).lean().exec();
  res.status(200).json({ user });
});

router.patch("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ user });
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ user });
});

module.exports = router;
