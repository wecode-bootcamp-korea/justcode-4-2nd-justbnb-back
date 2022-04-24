const express = require("express");
const router = express.Router();

const userRouter = require('./userRoute');
const accommodationsRoute = require('./accommodationsRoute');
const wishRoute = require('./wishRoute');
const imgUploadRouter = require('./imgUploadRouter');
const testRouter = require('./testRoute');

router.use('/user', userRouter);
router.use('/accommodations', accommodationsRoute);
router.use('/wish', wishRoute);
router.use('/aws-s3', imgUploadRouter);
router.use('/test', testRouter);


module.exports = router;