const express = require("express");
const usersResource = require("./users");
const uploadResource = require("./upload");

const router = express.Router();

router.use("/", usersResource);
router.use("/upload", uploadResource);

module.exports = router;
