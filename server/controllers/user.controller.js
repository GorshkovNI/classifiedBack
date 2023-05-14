const db = require('../database/database')
const cookie = require('cookie')
const userService = require('../servise/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-errors')
const User = require('../models/User/User')
const Role = require('../models/User/Role')


const UserController = {
    async registration(req, res, next){
        try{
            // const user = new User()
            // const role = new Role()
            // await user.save()
            // await role.save()
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {name, email, phone, password, dateRegistration} = req.body
            const userData = await userService.registration(name, email, phone, password, dateRegistration);
            
            // res.cookie('refreshToken', userData.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     domain: 'getit-khaki.vercel.app',
            //     secure: true,
            //     path: '/'
            // })
            console.log(userData)
            return res.json(userData)
        }
        catch (e){
            next(e)
        }
    },
    async login(req, res, next){
        try{
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            console.log('userdata',userData)
            // res.cookie('refreshToken', userData.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     domain: 'getit-khaki.vercel.app',
            //     secure: true,
            //     path: '/'
            // })
            return res.json(userData)
        }
        catch (e){
            next(e)
        }
    },
    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.json(token)
        }
        catch (e){
            next(e)
        }
    },
    async activate(req, res, next){
        try{
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }
        catch (e){
            next(e)
        }
    },
    async refresh(req, res, next){
        try{
            const {token} = req.body
            const refreshToken = await userService.refresh(token)
            // res.cookie('refreshToken', token.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     domain: 'getit-khaki.vercel.app',
            //     secure: true,
            //     path: '/'
            // })
            return res.json(refreshToken)
        }
        catch (e){
            next(e)
        }
    },

    async getUsers(req, res, next){
        try{
            const users = await userService.getAllUsers()
            return res.json(users)
        }
        catch (e){
            next(e)
        }
    },

}

module.exports = UserController