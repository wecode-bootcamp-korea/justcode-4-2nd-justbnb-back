const reservationDao = require("../models/reservationDao");
const errService = require("./errorService");

const createReservation = async (userId, accommodationsId, checkIn, checkOut, members, res) => {
    const values = [accommodationsId, checkIn, checkOut, members];
    checkVal(values, res);
    
    const hostId = await getAccommodationsById(accommodationsId);

    if(userId === hostId[0].host_id) {
        errService.errorHandler(409, "EXISTING_USER", res);
    }
    await reservationDao.createReservation(userId, accommodationsId, checkIn, checkOut, members);
}

const getReservationList = async (userId, res) => {

    const reservationList = await reservationDao.getReservationList(userId);
    
    if(reservationList.length <= 0) {
        errService.errorHandler(403, "EMPTY_DATA", res);
    }    
    return reservationList;
}

const getReservation = async (userId, res) => {

    const reservation = await reservationDao.getReservation(userId);

    if(reservation.length <= 0) {
        errService.errorHandler(403, "EMPTY_DATA", res);
    } 
    return reservation;
}

const getAccommodationsById = async (accommodationsId) => {
    return await reservationDao.getAccommodations(accommodationsId);
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

module.exports = { createReservation, getReservationList, getReservation }