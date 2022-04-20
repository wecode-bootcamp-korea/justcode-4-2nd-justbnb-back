const jwt = require("jsonwebtoken");
const errService = require("../services/errorService");

const auth = async (req, res, next) => {

    try {
        const { accessToken } = req.body;
        
        jwt.verify(accessToken, process.env.SECRET_KEY, 
            (err, decode) => {

                if(!!err) {
                    console.log("jwt Error : " + err.message);
                    errService.errorHandler(409, "INVALID_TOKEN", res);

                }else {
                    let nowDate = new Date(parseInt(decode.exp) * 1000);
                    let expDate = new Date();
                    let newAccessToken;
                    
                    (nowDate-expDate) < 550000 ? 
                        newAccessToken = jwt.sign({userId : decode.userId}, process.env.SECRET_KEY, {expiresIn: "30m"}) 
                        : newAccessToken = accessToken;

                    req.headers.accessToken = newAccessToken;
                    req.headers.userId = decode.userId;
                }
        });
        
        next();
    } catch (error) {
        next(error);        
    }

}

const error = (err, req, res, next) => {
    console.error(err);
}

module.exports = { error, auth }