const express = require("express");
const taskRouter = express.Router();
const { Task } = require("../models/todo");

taskRouter
  .route("/tasks/:username")

  .get(async function (req, res) {
    try {
      const tasks = await Task.find({ username: req.params.username });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .post(async function (req, res) {
    const task = new Task({
      username: req.params.username,
      title: req.body.title,
      description: req.body.description,
      frequency: req.body.frequency,
      createdAt: req.body.createdAt || new Date(),
      completionTill: req.body.completionTill,
    });

    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

taskRouter
  .route("/tasks/:username/:title")

  .get(async function (req, res) {
    try {
      const tasks = await Task.find({ title: req.params.title });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .put(async function (req, res) {
    const { username, id } = req.params;
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

taskRouter.route("/tasks/:username/:id").delete(async function (req, res) {
  const { username, id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRouter.route("/tasks/:username/:id").patch(async (req, res) => {
  const { username, id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, username: username },
      { completed: completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

taskRouter.patch("/set-reminder/:id", async (req, res) => {
  const { id } = req.params;
  const { reminderDate } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { reminder: new Date(reminderDate) },
      { new: true }
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send(task);
  } catch (error) {
    console.error("Error setting reminder:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Remove Reminder
taskRouter.patch("/remove-reminder/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { reminder: null },
      { new: true }
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send(task);
  } catch (error) {
    console.error("Error removing reminder:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = taskRouter;
