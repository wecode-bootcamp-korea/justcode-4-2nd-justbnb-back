const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const errService = require("./errorService");

const createUser = async (name, email, password, res) => {
    const values = [name, email, password];
    checkVal(values, res);

    const getUser = await getUserByEmail(email);

    if(getUser.length > 0) {
        errService.errorHandler(409, "EXISTING_USER", res);
    }
    const saltPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

    await userDao.createUser(name, email, saltPassword);
}

const createToken = async (email, password, res) => {
    const values = [email, password];
    checkVal(values, res);
    
    const getUser = await getUserByEmail(email);

    if(getUser.length <= 0) {
        errService.errorHandler(409, "INVALID_USER", res);
    }    
    if(!(bcrypt.compareSync(password, getUser[0].password))) {
        errService.errorHandler(409, "INVALID_USER", res);
    }    
    const accessToken = jwt.sign({userId : getUser[0].id}, process.env.SECRET_KEY, {expiresIn: "6h"});

    return accessToken;
}

const checkVal = (values, res) => {
    for(let i = 0; i < values.length; i++) {
        if(!values[i]) {
            errService.errorHandler(400, "KEY_ERROR", res);
        }
    }
}

const getUserByEmail = async (email) => {
    return await userDao.getUser(email);
}


module.exports = { createUser, createToken }