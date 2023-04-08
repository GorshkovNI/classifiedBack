const ApiErros = require('../exceptions/api-errors')
const tokenService = require('../servise/token-service')

module.exports = function (req, res, next){
    try{
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            return next(ApiErros.UnautorizedErrors());
        }
        const accessToken = authorizationHeader.split(" ")[1]

        if(!accessToken){
            return next(ApiErros.UnautorizedErrors());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiErros.UnautorizedErrors());
        }
        req.user = userData
        next();

    }
    catch (e){
        return next(ApiErros.UnautorizedErrors());
    }
}