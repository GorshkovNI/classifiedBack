const express = require('express')
const cookie = require('cookie')
const {hashPassword} = require("../utils/hash");
const {fakeUser} = require("../utils/fakeUser");
const {getTokens, refreshTokenAge} = require("../utils/getTokens");

const authRouter = express.Router()

authRouter.post("/login", (req, res) => {
    const {login, password} = req.body;

    const hash = hashPassword(password)
    const isVerifiedPassword = hash === fakeUser.passwordHash;

    if(login !== fakeUser.login || !isVerifiedPassword){
        return res.status(401).send("Login Failed")
    }

    const { accessToken, refreshToken } = getTokens(login);

    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenAge
        })
    )

    res.send({accessToken})
})

module.exports = authRouter