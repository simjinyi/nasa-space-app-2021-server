const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StatusCodes = require("http-status-codes").StatusCodes;
const User = require("../models/User");

const router = express.Router();

const PRIVATE_KEY = "s]C%gkNb2&m>hL$";

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
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    }).exec();

    if (user) {
      const comparisonResult = await bcrypt.compare(password, user.password);

      if (comparisonResult) {
        const token = jwt.sign({ userID: user.id }, PRIVATE_KEY);
        return res.status(StatusCodes.OK).json({
          token,
        });
      }
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
});

module.exports = router;
