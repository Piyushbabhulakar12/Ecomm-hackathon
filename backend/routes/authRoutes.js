const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, "secretkey");
    res.status(200).json({ token, email });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const resetToken = generateResetToken();

    user.resetToken = resetToken;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: "piyushbabhulakar12@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    res.status(200).send("Reset password email sent successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing request");
  }
});

const generateResetToken = () => {
  const crypto = require("crypto");
  return crypto.randomBytes(20).toString("hex");
};

router.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({ resetToken });

    if (!user) {
      return res.status(404).send("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing request");
  }
});

module.exports = router;
