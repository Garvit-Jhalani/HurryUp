const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = Schema({
  email: String,
  password: String,
});

const registerSchema = Schema({
  email: String,
  password: String,
});

const taskSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completionTill: {
    type: Date,
    default: Date.now,
  },
  reminder: {
    type: Date,
    default: null,
  },
});

const Login = mongoose.model("Login", loginSchema);
const Register = mongoose.model("Register", registerSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = {
  Login,
  Register,
  Task,
};
