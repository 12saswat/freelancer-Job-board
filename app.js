const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const connectToDb = require("./config/db");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.use("/users", userRoutes);

module.exports = app;
