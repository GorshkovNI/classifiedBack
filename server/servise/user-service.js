const db = require('../database/database')
const mailService = require('./mail-service')
const uuid = require('uuid')
const tokenService = require('./token-service')
const ApiError = require("../exceptions/api-errors");


function generateUserId() {
    const id = Math.floor(Math.random() * 1000); // Генерируем случайное число от 0 до 999
    const paddedId = String(id).padStart(3, '0'); // Добавляем нули перед числом, если оно меньше трёх цифр
    return `${paddedId}-${paddedId}-${paddedId}`;
}

const UserService ={
    async registration(name, email, password){
        const result = await db.query('SELECT COUNT(*) FROM person WHERE email = $1', [email])
        if(result.rows[0].count != 0){
            throw ApiError.BadRequest('Пользователь с таким email уже существует')
        }

        const activationLink = uuid.v4()
        const id = uuid.v4().replace(/-/g, '');
        await db.query('INSERT INTO PERSON (ID, NAME, EMAIL, ISACTIVATED, ACTIVATELINK, PASSWORD) VALUES ( $1, $2, $3, $4, $5, $6)', [id, name, email, false, activationLink, password])
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const tokens = tokenService.generationToken({email})
        await tokenService.saveToken(id, tokens.refreshToken)
        return {...tokens, user:{id: id, name: name}}
    },

    async activate(activateLink){
        const link = await db.query('SELECT activatelink FROM person where activateLink = $1', [activateLink])
        if(link.rows.length == 0){
            throw ApiError.BadRequest('Некоректная ссылка активации')
        }
        console.log(activateLink)
        await db.query('UPDATE person SET ISACTIVATED = true WHERE ACTIVATELINK = $1', [activateLink])
    },

    async login(email, password){
        const user = await db.query('SELECT COUNT(*), id, name, email, password FROM person WHERE email = $1 GROUP BY id, name, email, password', [email])
        if(user.rows[0].count == 0){
            throw ApiError.BadRequest(`Пользователь с ${email} не зарегистрирован`)
        }
        if(user.rows[0].password != password){
            throw ApiError.BadRequest('Неверный пароль')
        }
        const tokens = tokenService.generationToken({email})
        await tokenService.saveToken(user.rows[0].id, tokens.refreshToken)
        return {...tokens, user:{id: user.rows[0].id, name: user.rows[0].name}}

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
        if(!!!token ||  !userData){ // !!token - потому что findToken вернет 0 или 1 (0 - нет токена в БД, 1 - токен существует)
            throw ApiError.UnautorizedErrors()
        }
        const user = await db.query('select p.id, p.email, p.name from person p\n' +
            'join tokens t on t.id = p.id\n' +
            'where t.refreshToken = $1', [refreshToken])
        const {id, email} = user.rows[0]
        const tokens = tokenService.generationToken({email})
        await tokenService.saveToken(id, tokens.refreshToken)

        return {...tokens, user:{id: user.rows[0].id, name: user.rows[0].name}}
    },

    async getAllUsers(){
        const users = await db.query('SELECT * FROM person')
        return users.rows
    }
}

module.exports = UserService;