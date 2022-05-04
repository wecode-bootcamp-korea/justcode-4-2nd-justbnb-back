const accommodationsService = require("../services/accommodationsService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const accommodationsList = async (req, res, next) => {

    try {
        const { city, buildType, roomType, animalYn, totalMembers, charge } = req.query;
        
        const accommodationsList = await accommodationsService.getAccommodationsList(city, buildType, roomType, animalYn, totalMembers, charge, res);
        
        res.status(200).json({accommodationsList : accommodationsList, status : 200});
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
        
        res.status(200).json({accommodations : accommodations, status : 200});
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
        
        res.status(200).json({accommodationsImages : accommodationsImages, status : 200});
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
        
        res.status(200).json({accommodationsConvenience : accommodationsConvenience, status : 200});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const registration = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers, imageUrl, convenienceId } = req.body;
        
        await accommodationsService.createAccommodationsImagesConvenience(userId, name, description, city, location, lat, long, buildType, roomType, charge, animalYn, totalMembers, imageUrl, convenienceId, res);
              
        res.status(201).json({message : `create accommodations success`, accessToken : accessToken, status : 201});
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