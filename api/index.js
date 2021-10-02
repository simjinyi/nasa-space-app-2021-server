const express = require("express");
const userResources = require("./users");

const router = express.Router();

router.use("/", userResources);

module.exports = router;
