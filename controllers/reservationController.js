const reservationService = require("../services/reservationService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createReservation = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { accommodationsId, checkIn, checkOut, members } = req.body;

        await reservationService.createReservation(userId, accommodationsId, checkIn, checkOut, members, res);

        res.status(201).json({message : `create reservation success`, accessToken : accessToken});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const error = (err, req, res, next) => {
    console.error(err);
}

module.exports = { error, createReservation }