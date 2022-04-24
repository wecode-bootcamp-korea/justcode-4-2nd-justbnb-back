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

const accommodationsList = async (req, res, next) => {

    try {
        const { city } = req.query;
        const accommodationsList = await accommodationsService.getAccommodationsList(city, res);
        
        res.status(200).json({accommodationsList : accommodationsList});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const accommodations = async (req, res, next) => {

    try {
        const { id } = req.params;

        const accommodations = await accommodationsService.getAccommodations(id, res);
        
        res.status(200).json({accommodations : accommodations});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const accommodationsImages = async (req, res, next) => {

    try {
        const { accommodationsId } = req.query;
        
        const accommodationsImages = await accommodationsService.getAccommodationsImages(accommodationsId, res);
        
        res.status(200).json({accommodationsImages : accommodationsImages});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const accommodationsConvenience = async (req, res, next) => {

    try {
        const { accommodationsId } = req.query;
        
        const accommodationsConvenience = await accommodationsService.getAccommodationsConvenience(accommodationsId, res);
        
        res.status(200).json({accommodationsConvenience : accommodationsConvenience});
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

module.exports = { 
    error, 
    registration, 
    accommodationsList, 
    accommodations, 
    accommodationsImages, 
    accommodationsConvenience 
}