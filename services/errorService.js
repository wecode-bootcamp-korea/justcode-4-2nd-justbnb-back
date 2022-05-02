
const errorHandler = (statusCode, errorCode, res) => {
    res.status(statusCode).json({message : errorCode, status : statusCode});
    throw new Error(errorCode);
}

module.exports = { errorHandler }