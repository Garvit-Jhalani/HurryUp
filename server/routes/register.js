const express = require("express");
const registerRouter = express.Router();
const { Login, Register } = require("../models/todo");

const app = express();

registerRouter.route("/register").post(async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Fields are missing..." });
  }

  Login.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(409).json({
          message: "User already exist by this email. Please login instead",
        });
      }

      const newUser = new Login({ email, password });
      newUser.save();
    })
    .then(() => {
      res.status(200).json({
        message: "Registration Successful. Please Login To Continue.",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Occurred " + err.message });
    });
});

module.exports = registerRouter;
