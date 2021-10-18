require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cookieParser());
const Pusher = require("pusher");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
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


const pusher = new Pusher({
  appId: "1279266",
  key: "bb620f86342dcb7e4205",
  secret: "850f83d3e2f08c4add83",
  cluster: "ap2",
  useTLS: true
});

app.post("/chat" , async function (req, res) {
  const { message, userName } = req.body;
  // console.log(message)
  // trigger a new post event via pusher
  Notification("new message" , );
  await pusher.trigger("my-channel", "my-event", {
    message,
    userName,
  
  });

  res.json({ status: 200 });

})



const PORT = process.env.SERVER_PORT || 4500;



app.listen(PORT, async function () {
  await connect();

  console.log(`Listning to port ${PORT}`);
});
