const express = require("express");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const { Login } = require("../models/todo");

loginRouter
  .route("/login")

  .post(async function (req, res) {
    let token = jwt.sign({email: req.body.email} , "TOKEN");

    // console.log(req.body);
    const a = req.body.email;
    const findDetails = new Login({
      email: req.body.email,
      password: req.body.password,
    });
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Enter the Email and Password" });
    }
    Login.findOne({ email: a })
      .then((user) => {
        // console.log(user);
        if (!user) {
          return res.status(404).json({
            message: "User Not find by this Email. Please register first",
          });
        }
        if (user.password !== req.body.password) {
          return res.status(400).json({ message: "Incorrect Password..." });
        } else {
          return res.status(200).json({ message: "Login Successful...", token });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Failed to find the user!");
      });
  });

module.exports = loginRouter;
