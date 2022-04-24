const jwt = require("jsonwebtoken");
const errService = require("../services/errorService");

const auth = async (req, res, next) => {

    try {
        const { accessToken } = Object.keys(req.body).length === 0 ? req.query : req.body;       
        
        jwt.verify(accessToken, process.env.SECRET_KEY, 

            (err, decode) => {

                if(!!err) {
                    console.log("jwt Error : " + err.message);
                    errService.errorHandler(409, "INVALID_TOKEN", res);
                }else {                    
                    const newAccessToken = updateToken(decode, accessToken);

                    req.headers.accessToken = newAccessToken;
                    req.headers.userId = decode.userId;
                }
        });
        
        next();
    } catch (error) {
        next(error);        
    }

}

const updateToken = (decode, accessToken) => {
    let nowDate = new Date();
    let expDate = new Date(parseInt(decode.exp) * 1000);
    let newAccessToken;
    
    (expDate-nowDate) < 60 * 60 * 1000 ? 
        newAccessToken = jwt.sign({userId : decode.userId}, process.env.SECRET_KEY, {expiresIn: "3h"})
        : newAccessToken = accessToken;

    return newAccessToken;
}

const error = (err, req, res, next) => {
    console.error(err);
}

module.exports = { error, auth }