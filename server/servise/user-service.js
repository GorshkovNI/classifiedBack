const db = require('../database/database')
const mailService = require('./mail-service')
const uuid = require('uuid')
const bcrypt = require('bcrypt');
const tokenService = require('./token-service')
const ApiError = require("../exceptions/api-errors");
const User = require('../models/User/User');
const Role = require('../models/User/Role');


function generateUserId() {
    const id = Math.floor(Math.random() * 1000); // Генерируем случайное число от 0 до 999
    const paddedId = String(id).padStart(3, '0'); // Добавляем нули перед числом, если оно меньше трёх цифр
    return `${paddedId}-${paddedId}-${paddedId}`;
}

const UserService ={
    async registration(name, email, phone, password, dateRegistration){
        const result = await User.findOne({email})
        if(result?.isActivate === true){
            throw ApiError.BadRequest('Пользователь с таким email уже существует')
        }
        try {
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({name, email, phone, password: hashPassword, dateRegistration, isActivate: false ,roles:[userRole.value]})
            await user.save()
            console.log('after save')
            const activationLink = uuid.v4()
            // const id = uuid.v4().replace(/-/g, '');
            // await db.query('INSERT INTO PERSON (ID, NAME, EMAIL, ISACTIVATED, ACTIVATELINK, PASSWORD) VALUES ( $1, $2, $3, $4, $5, $6)', [id, name, email, false, activationLink, password])
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            await User.updateOne({_id: user['_id']}, {$set: {activateLink: `${activationLink}`}})
            //user.activateLink = `${activationLink}`
            const tokens = tokenService.generationToken({email})
            await tokenService.saveToken(user._id, tokens.refreshToken)
            return {...tokens, user:user}
        }catch (e){
            console.log(e)
        }

    },

    async activate(activateLink){
        const user = await User.findOne({activateLink: activateLink})
        console.log('activateLink ', user)
        if(!user){
            throw ApiError.BadRequest('Некоректная ссылка активации')
        }
        await User.updateOne({_id: user['_id']}, {$set: {isActivate: true}})
        await user.save()
    },

    async login(email, password){
        //const user = await db.query('SELECT COUNT(*), id, name, email, password FROM person WHERE email = $1 GROUP BY id, name, email, password', [email])
        const user = await User.findOne({email})
        if(!user){
            console.log('User не найден!')
            throw ApiError.BadRequest(`Пользователь с ${email} не зарегистрирован`)
        }
        const isPassEquals = bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }
        const tokens = tokenService.generationToken({email})
        await tokenService.saveToken(user._id, tokens.refreshToken)
        return {...tokens, user:user}
    },

    async logout(refreshtoken){
        const token = tokenService.removeToken(refreshtoken)
        return token
    },

    async refresh(refreshToken){

        if(!refreshToken){
            throw ApiError.UnautorizedErrors()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const token = tokenService.findToken(refreshToken)
        if(!token ||  !userData){ // !!token - потому что findToken вернет 0 или 1 (0 - нет токена в БД, 1 - токен существует)
            throw ApiError.UnautorizedErrors()
        }
        // const user = await db.query('select p.id, p.email, p.name from person p\n' +
        //     'join tokens t on t.id = p.id\n' +
        //     'where t.refreshToken = $1', [refreshToken])
        // const {id, email} = user.rows[0]
        const email = userData.email
        const user = await User.findOne({email});
        const tokens = tokenService.generationToken({email})
        await tokenService.saveToken(user._id, tokens.refreshToken)
        return {...tokens, user:user}
    },

    async getAllUsers(){
        // const users = await db.query('SELECT * FROM person')
        // return users.rows
        const users = await User.find()
        return users
    }
}

module.exports = UserService;