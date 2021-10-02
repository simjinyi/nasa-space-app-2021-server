const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), (req, res, next) => {
  if (!req.file) res.sendStatus(400);
  return res.json(req.file);
});

module.exports = router;
