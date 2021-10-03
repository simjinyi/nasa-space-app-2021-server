const express = require("express");

const userResources = require("./users");
const missionResources = require("./missions");
const uploadResource = require("./upload");

const router = express.Router();

router.use("/users", userResources);
router.use("/missions", missionResources);
router.use("/upload", uploadResource);

module.exports = router;
