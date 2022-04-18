//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");

const testDao = require("../models/testDao");
const errService = require("./errorService");

const testPing = async (ping, res) => {
    if(ping !== "ping") {
        errService.errorHandler(400, "PING_ERROR", res);
    }
    const testData = await testDao.testDao();

    return testData;
}


module.exports = { testPing }