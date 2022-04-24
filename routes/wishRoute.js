const express = require("express");
const router = express.Router();

const wishController = require("../controllers/wishController");
const authMiddleware = require("../middleware/authorization");

router.get("/", authMiddleware.auth, wishController.wish);
router.post("/", authMiddleware.auth, wishController.createWish);
router.delete("/", authMiddleware.auth, wishController.deleteWish);
router.get("/mywish", authMiddleware.auth, wishController.myWishList);
router.use("/", wishController.error);

module.exports = router;