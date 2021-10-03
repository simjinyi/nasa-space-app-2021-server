const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StatusCodes = require("http-status-codes").StatusCodes;
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    const data = await user.save();
    return res.sendStatus(StatusCodes.CREATED);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (await bcrypt.compare(req.body.password, user.password)) {
    return res.json({
      token: jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        PRIVATE_KEY
      ),
    });
  }
  return res.status(400).json({ error: "Invalid password" });
});

module.exports = router;

const PRIVATE_KEY = `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`;
