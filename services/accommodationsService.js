const accommodationsDao = require("../models/accommodationsDao");
const errService = require("./errorService");

const createAccommodations = async (userId, name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers, res) => {
    
    const values = [userId, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers];
    checkVal(values, res);

    const getUser = await getUserById(userId);
    if(getUser.length <= 0) {
        errService.errorHandler(409, "EXISTING_USER", res);
    }
    await accommodationsDao.createAccommodations(getUser[0].id, name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers);
}

const createAccommodationsImg = async (userId, imageUrl, res) => {
    checkVal(imageUrl, res);

    const accommodationsId = await getAccommodationsById(userId);
    
    await accommodationsDao.createAccommodationsImg(accommodationsId[0].id, imageUrl);
}

const createConvenience = async (userId, convenienceId, res) => {
    checkVal(convenienceId, res);

    const accommodationsId = await getAccommodationsById(userId);

    await accommodationsDao.createConvenience(accommodationsId[0].id, convenienceId);
}

const getAccommodationsById = async (userId) => {
    return await accommodationsDao.getAccommodations(userId);
}

const getUserById = async (userId) => {
    return await accommodationsDao.getUser(userId);
}

const checkVal = (values, res) => {
    for(let i = 0; i < values.length; i++) {
        if(!values[i]) {
            errService.errorHandler(400, "KEY_ERROR", res);
        }
    }
}

module.exports = { createAccommodations, createAccommodationsImg, createConvenience }