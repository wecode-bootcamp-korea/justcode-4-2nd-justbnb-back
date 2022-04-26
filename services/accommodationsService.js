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

const getAccommodationsList = async (city, buildType, roomType, animalYn, totalMembers, charge, res) => {
    return await accommodationsDao.getAccommodationsList(city, buildType, roomType, animalYn, totalMembers, charge);
}

const getAccommodations = async (id, res) => {
    checkVal(id, res);

    return await accommodationsDao.getAccommodationsInfo(id);
}

const getAccommodationsImages = async (accommodationsId, res) => {
    checkVal(accommodationsId, res);

    return await accommodationsDao.getAccommodationsImages(accommodationsId);
}

const getAccommodationsConvenience = async (accommodationsId, res) => {
    checkVal(accommodationsId, res);

    return await accommodationsDao.getAccommodationsConvenience(accommodationsId);
}

const getAccommodationsById = async (userId) => {
    return await accommodationsDao.getAccommodations(userId);
}

const getUserById = async (userId) => {
    return await accommodationsDao.getUser(userId);
}

const checkVal = (values, res) => {
    if(values.length === 0) {
        if(values === null || values === undefined || values === "") {
            errService.errorHandler(400, "KEY_ERROR", res);
        }
    }

    for(let i = 0; i < values.length; i++) {
        if(!values[i] || values[i] === null || values[i] === undefined || values[i] === "") {
            errService.errorHandler(400, "KEY_ERROR", res);
        }
    }
}

const createAccommodationsImagesConvenience = async (userId, name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers, imageUrl, convenienceId, res) => {
    
    const values = [userId, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers];
    checkVal(values, res);
    checkVal(imageUrl, res);
    checkVal(convenienceId, res);

    const getUser = await getUserById(userId);
    if(getUser.length <= 0) {
        errService.errorHandler(409, "EXISTING_USER", res);
    }

    await accommodationsDao.createAccommodationsImagesConvenience(getUser[0].id, name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers, imageUrl, convenienceId);
}

module.exports = { 
    createAccommodationsImagesConvenience,
    getAccommodationsList, 
    getAccommodations, 
    getAccommodationsImages, 
    getAccommodationsConvenience
}