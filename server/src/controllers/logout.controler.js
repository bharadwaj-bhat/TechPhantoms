const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
router.get("/", (req, res) => {
  console.log("Hello profile");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;
