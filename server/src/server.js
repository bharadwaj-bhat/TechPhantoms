require("dotenv").config();
let express = require("express");

const connect = require("./Config/db");

const app = express();
app.use(express.json());

const UserController = require("./Controllers/user.controller");

app.use("/users", UserController);

const PORT = process.env.SERVER_PORT || 4500;
app.listen(PORT, async function () {
  await connect();
  console.log(`Listning to port ${PORT}`);
});
