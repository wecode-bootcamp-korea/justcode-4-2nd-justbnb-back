const express = require("express");
const router = express.Router();

const uploader = require("../middleware/upload");

router.post("/", uploader.uploadHandle);

module.exports = router;