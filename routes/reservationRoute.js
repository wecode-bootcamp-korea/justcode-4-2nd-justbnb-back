const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authorization");

router.post("/", authMiddleware.auth, reservationController.createReservation);
router.get("/host", authMiddleware.auth, reservationController.reservationList);
router.get("/guest", authMiddleware.auth, reservationController.reservation);
router.use("/", reservationController.error);

module.exports = router;