const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");
const authMiddleware = require("../middleware/authorization");

router.get("/ping", testController.ping);
router.post("/authtest", authMiddleware.auth, testController.authtest);
router.use("/", testController.error);

module.exports = router;