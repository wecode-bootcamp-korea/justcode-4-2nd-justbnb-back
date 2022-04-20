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

const authtest = async (req, res, next) => {

    try {
        const { accessToken, userId } = req.headers;
        const { email, name } = req.body;
        
        //console.log(userId);
        //console.log(accessToken);
        //console.log(email);
        //console.log(name);

        //jwt expired - 만료
        //invalid signature - 토큰수정

        res.status(200).json({accessToken : accessToken});
    } catch (error) {
        next(error);
    }

}

const error = (err, req, res, next) => {
    console.error(err);
}

module.exports = { ping, error, authtest}