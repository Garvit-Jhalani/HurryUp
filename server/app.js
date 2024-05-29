const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const taskRouter = require("./routes/task");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { sendReminderEmail } = require("./reminderService");

const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/HurryUp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/HurryUp", loginRouter, registerRouter, taskRouter);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
