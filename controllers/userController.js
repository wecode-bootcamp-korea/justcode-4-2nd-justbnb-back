const userService = require("../services/userService");
const { PrismaClient } = require("@prisma/client");
const got = require("got");

const prisma = new PrismaClient();

const signup = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        
        await userService.createUser(name, email, password, res);

        res.status(201).json({message : `create user success`, status : 201});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

const signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        
        const accessToken = await userService.createToken(email, password, res);

        res.status(200).json({accessToken : accessToken, status : 200});
    } catch (error) {
        next(error);
        await prisma.$disconnect();
    } finally {
        await prisma.$disconnect();
    }

}

/* 
    -backend만 구현 됨
    -email 선택동의를 필수로 받기    
    -front쪽 KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI 확인하기
*/
const kakao = async (req, res, next) => {

    try {
        const code = req.query.code;
        //console.log(code);
        let userEmail;
        let userNickname;
        
        console.log("-----step1 인가코드 발급------");
        await got.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&client_secret=${process.env.KAKAO_CLIENT_SECRET}`,
            {headers: {'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'}})
            .then(res => JSON.parse(res.body))
            .then((result) => {
                console.log("-----step2 토큰 발급------");
                got.get(`https://kapi.kakao.com/v2/user/me`,
                    {headers: {'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
                                'Authorization' : `Bearer ${result.access_token}`}
                })
                .then((result) => {
                    console.log("-----step3 사용자 정보 추출------");
                    //console.log(JSON.parse(result.body));
                    //console.log(JSON.parse(result.body).kakao_account);
                    console.log(JSON.parse(result.body).kakao_account.email);
                    console.log(JSON.parse(result.body).kakao_account.profile.nickname);

                    userEmail = JSON.parse(result.body).kakao_account.email;
                    userNickname = JSON.parse(result.body).kakao_account.profile.nickname;
                });
            });
            
        const accessToken = await userService.createTokenByKakao(userEmail, userNickname, res);
        
        res.status(200).json({accessToken : accessToken, status : 200});
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

module.exports = { error, signup, signin, kakao }