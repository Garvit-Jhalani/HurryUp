const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { Task } = require("./models/todo.js"); // Adjust the path as necessary

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "garvitjhalani@gmail.com",
    pass: "23/10/2004",
  },
});

const sendReminderEmail = (userEmail, task) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: `Reminder: ${task.title} is due soon`,
    text: `Hello, this is a reminder that your task "${task.title}" is due on ${task.completionTill}. Please complete it soon!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Setup Cron Job
cron.schedule("* * * * *", async () => {
  // Adjust the cron schedule as necessary
  const now = new Date();
  const tasks = await Task.find({
    reminder: { $ne: null },
    completionTill: { $gte: now },
    reminder: { $lte: now },
  });

  tasks.forEach(async (task) => {
    const user = await Register.findOne({ email: task.username });
    if (user) {
      sendReminderEmail(user.email, task);
    }

    // Remove the reminder after sending email
    task.reminder = null;
    await task.save();
  });
});

module.exports = { sendReminderEmail };
