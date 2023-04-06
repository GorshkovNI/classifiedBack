const jwt = require("jsonwebtoken")

const signatureAccess = "MySuP3R_z3kr3t_access"
const signatureRefresh = "MySuP3R_z3kr3t_refresh"

const accessTokenAge = 20
const refreshTokenAge = 60 * 60

const getTokens = (login) => ({
    accessToken: jwt.sign({login: login}, signatureAccess, {
        expiresIn: `${accessTokenAge}s`
    }),
    refreshToken: jwt.sign({login: login}, signatureRefresh, {
        expiresIn: `${refreshTokenAge}s`
    })
})

module.exports = {
    getTokens,
    refreshTokenAge
}

