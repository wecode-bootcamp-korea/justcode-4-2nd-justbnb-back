const userService = require("../services/userService");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const signup = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        
        await userService.createUser(name, email, password, res);

        res.status(201).json({message : `create user success`});
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

module.exports = { error, signup }