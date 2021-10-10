const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/user.model");
require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notification = require("../pushNotifcation/Notification");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
     
      
      return res.status(422).json({ error: "You can't empty the faild" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 50000000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res
          .status(422)
          .json({ error: "Please Enter Coreect Username or password" });
      } else {
        res.json({ message: "user Login success" });
      }
    } else {
      res.status(400).json({ error: "Invalid credential" });
    }
  } catch (err) {
    console.log(err, "err");
  }
});

module.exports = router;
