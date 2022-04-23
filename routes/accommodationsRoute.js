const express = require("express");
const router = express.Router();

const accommodationsController = require("../controllers/accommodationsController");
const authMiddleware = require("../middleware/authorization");

router.post("/", authMiddleware.auth, accommodationsController.registration);
router.get("/", accommodationsController.accommodationsList);
router.use("/", accommodationsController.error);

module.exports = router;