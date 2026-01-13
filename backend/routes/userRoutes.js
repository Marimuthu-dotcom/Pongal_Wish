const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST – save user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        message: "Email already exists",
        alreadyExists: true
      });
    }

    await User.create({ name, email, password });

    res.status(201).json({
      message: "User saved successfully 🎉",
      alreadyExists: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
