const express = require("express");
const bcrypt = require("bcrypt");
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

module.exports = router;
