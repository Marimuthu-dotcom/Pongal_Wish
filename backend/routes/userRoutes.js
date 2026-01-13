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

    // check duplicate email
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User saved successfully 🎉",
      user,
    });
  } catch (err) {
     console.error(err);  // <-- ADD THIS
  res.status(500).json({
    message: err.message || "Server error"
  });
  }
});

module.exports = router;
