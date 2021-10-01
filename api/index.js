const express = require("express");
const usersResource = require("./users");

const router = express.Router();

router.use("/", usersResource);

module.exports = router;
