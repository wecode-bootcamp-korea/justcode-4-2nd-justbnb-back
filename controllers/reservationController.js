const reservationService = require("../services/reservationService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createReservation = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { accommodationsId, checkIn, checkOut, members } = req.body;

        await reservationService.createReservation(userId, accommodationsId, checkIn, checkOut, members, res);

        res.status(201).json({message : `create reservation success`, accessToken : accessToken, status : 201 });
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const reservationList = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;

        const reservationList = await reservationService.getReservationList(userId, res);

        res.status(200).json({ accessToken : accessToken, reservationList : reservationList, status : 200});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const reservation = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;

        const reservation = await reservationService.getReservation(userId, res);

        res.status(200).json({ accessToken : accessToken, reservation : reservation, status : 200});
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

module.exports = { error, createReservation, reservationList, reservation }