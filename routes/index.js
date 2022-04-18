const express = require("express");
const router = express.Router();

const testRouter = require('./testRoute');

router.use('/test', testRouter);

module.exports = router;