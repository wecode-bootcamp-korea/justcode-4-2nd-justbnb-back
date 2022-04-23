const accommodationsService = require("../services/accommodationsService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const registration = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers, imageUrl, convenienceId } = req.body;
        
        await accommodationsService.createAccommodations(userId, name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers, res);
        await accommodationsService.createAccommodationsImg(userId, imageUrl, res);
        await accommodationsService.createConvenience(userId, convenienceId, res);
        
        res.status(201).json({message : `create accommodations success`, accessToken : accessToken});
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

module.exports = { error, registration }