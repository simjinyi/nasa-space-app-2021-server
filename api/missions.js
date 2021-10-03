const express = require("express");
const StatusCodes = require("http-status-codes").StatusCodes;

const Mission = require("../models/Mission");
const { authenticateTokenHTTP } = require("../middlewares/auth");

const router = express.Router();

router.use(authenticateTokenHTTP);

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
    const mission = new Mission({});
    const data = await mission.save();
    return res.sendStatus(StatusCodes.CREATED);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
});

module.exports = router;
