const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");
const authMiddleware = require("../middleware/authorization");
const uploader = require("../middleware/upload");

router.get("/ping", testController.ping);
router.post("/authtest", authMiddleware.auth, testController.authtest);
router.post("/upload", uploader.uploadHandle, testController.upload);

//router.use("/", testController.error);

module.exports = router;