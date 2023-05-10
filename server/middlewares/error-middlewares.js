const ApiError = require("../exceptions/api-errors");

module.exports = function(err, req, res, next){
    if(err instanceof ApiError){
        console.log('Send error')
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Произошла непредвиденная ошибка'})
}