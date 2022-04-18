const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");

router.get("/ping", testController.ping);
router.use("/", testController.error);

module.exports = router;