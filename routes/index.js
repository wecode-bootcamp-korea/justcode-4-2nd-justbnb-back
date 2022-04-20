const express = require("express");
const router = express.Router();

const userRouter = require('./userRoute');
const testRouter = require('./testRoute');

router.use('/user', userRouter);
router.use('/test', testRouter);


module.exports = router;