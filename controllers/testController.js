const testService = require("../services/testService");
//const { PrismaClient } = require("@prisma/client");

//const prisma = new PrismaClient();

const ping = async (req, res, next) => {

    try {
        const pong = await testService.testPing("ping", res);

        res.status(200).json({message : `${pong} success`});
    } catch (error) {
        next(error);
        //await prisma.$disconnect();
    } finally {
        //await prisma.$disconnect();
    }

}

const error = (err, req, res, next) => {
    console.error(err);
}

module.exports = { ping, error}