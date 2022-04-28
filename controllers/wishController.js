const wishService = require("../services/wishService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const wish = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { accommodationsId, city } = req.query;

        let wish;

        if(!!accommodationsId) {
            wish = await wishService.getWish(userId, accommodationsId, res);
        }
        if(!!city) {
            wish = await wishService.getWishList(userId, city, res);
        }        

        res.status(200).json({accessToken : accessToken, wish : wish, status : 200});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const myWishList = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;

        let myWishList = await wishService.getMyWishList(userId, res);

        res.status(200).json({accessToken : accessToken, myWishList : myWishList, status : 200});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const createWish = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { accommodationsId } = req.body;

        await wishService.createWish(userId, accommodationsId, res);

        res.status(201).json({message : `create wish success`, accessToken : accessToken, status : 201});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const deleteWish = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { accommodationsId } = req.query;

        await wishService.deleteWish(userId, accommodationsId, res);

        res.status(200).json({message : `delete wish success`, accessToken : accessToken, status : 200});
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

module.exports = { error, wish, myWishList, createWish, deleteWish }