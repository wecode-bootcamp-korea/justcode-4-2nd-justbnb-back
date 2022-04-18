
const errorHandler = (statusCode, errorCode, res) => {
    res.status(statusCode).json({message : errorCode});
    throw new Error(errorCode);
}

module.exports = { errorHandler }