<<<<<<< HEAD
const express = require("express")
const router = express.Router();
=======
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
      console.log(Notification("Rakesh", "Rakesh notification"))
      
      return res.status(422).json({ error: "You can't empty the faild" });
    }
>>>>>>> 69158c0b84cd6ca031bbdc4f86d6ca718c79d982

const UserData = require("../models/user.model")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.get('/', (req, res) => {
    return res.status(200).json({ data: "hello loginpage" })

})
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserData.findOne({ username: username })
    // console.log(user)

    if (!user) {
        return res.status(400).json({
            error: "true",
            message: "User not found"
        })
    }
    else {
        const isPassMatch = await bcrypt.compare(password, user.password)
        if (!user.tokens) {
            const token = await user.generateAuthToken();
            console.log("token generation")
            res.cookie('instajwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });
        }
        if (!isPassMatch) {
            res.status(400).json({
                error: "true",
                message: "You have entered wrong password"
            });

        }
        else {

            res.status(200).json({
                error: false,
                message: 'User logged in successsfully', data: user,
            });
        }
    }
})
module.exports = router;