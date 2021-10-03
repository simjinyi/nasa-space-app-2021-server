const express = require("express");
const StatusCodes = require("http-status-codes").StatusCodes;
const Mission = require("../models/Mission");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const missions = await Mission.find().all();
    res.status(StatusCodes.OK).json(missions);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
});

module.exports = router;
