require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cookieParser());
// const cookieparser = require("cookie-parser");

app.use(express.json());
// app.use(cookieParser());
const userSchema = require("./controllers/user.controller");
const logingRouter = require("./controllers/login.controller");
const profile = require("./controllers/profile.controller");
const logout = require("./controllers/logout.controler");
const  Notification  = require("./pushNotifcation/Notification.js");

app.use(cors());


app.use("/users", userSchema);
app.use("/login", logingRouter);
app.use("/profile", profile);
app.use("/logout", logout);

const PORT = process.env.SERVER_PORT || 4500;



app.listen(PORT, async function () {
  await connect();

  console.log(`Listning to port ${PORT}`);
});
