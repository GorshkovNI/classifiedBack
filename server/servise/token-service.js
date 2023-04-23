const jwt = require('jsonwebtoken')
const db = require("../database/database");
const User = require('../models/User/User');
const Token = require('../models/User/Token/Token')

const TokenService = {
    generationToken(payload){
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    },

    validateAccessToken(token){
        try{
            const isVerefied = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return isVerefied
        }
        catch (e){
            return null;
        }
    },

    validateRefreshToken(token){
        try{
            const isVerefied = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return isVerefied
        }
        catch (e){
            return null;
        }
    },

    async saveToken(userId, refreshToken){
        //const result = await db.query('SELECT COUNT(*) FROM tokens where id = $1', [userId])
        // const result = await User.findOne({_id: userId}, "refreshToken")
        // console.log("saveToken: ", result)
        // if(result.rows[0].count != 0){
        //     await db.query('UPDATE tokens SET refreshtoken = $1 WHERE id = $2', [refreshToken, userId])
        // }
        // else{
        //     await db.query('INSERT INTO tokens (id, refreshToken) values($1, $2)', [userId, refreshToken])
        // }

        const tokenData = await Token.findOne({userId, refreshToken})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token;
    },

    async removeToken(refreshToken){
        // const tokenData = await db.query('DELETE FROM tokens WHERE refreshToken = $1', [refreshToken])
        // return tokenData
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData
    },

    async findToken(refreshToken){
        // const token = await db.query('SELECT COUNT(*) FROM tokens where refreshToken = $1', [refreshToken])
        // return token.rows[0].count == 0 ?  0 : 1
        const token = await Token.findOne({refreshToken})
        return token
    }

}

module.exports = TokenService