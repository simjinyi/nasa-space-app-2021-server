const express = require("express");
const userResources = require("./users");
const missionResources = require("./missions");

const router = express.Router();

router.use("/users", userResources);
router.use("/missions", missionResources);

module.exports = router;
