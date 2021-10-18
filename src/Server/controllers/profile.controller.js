const express = require("express");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  console.log("Hello profile");
  res.send(req.rootUser);
});

module.exports = router;
