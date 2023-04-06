const db = require('../database/database')

class UserController{
    async createUser(req, res){
        const {name, surname} = req.body
        const data = {
            name: name,
            surname: surname
        }
        //const newPerson = await db.query('INSERT INTO  person (name, surname) values ($1, $2) returning *', [name, surname])
        res.json(data)

    }
    async getAllUsers(req, res){
        const user = await db.query('select * from person')
        res.json(user.rows)
    }
    async getOneUsers(req, res){
        const id = req.params.id
        const user = await db.query('select * from person where id = $1', [id])
        res.json(user.rows[0])
    }
    async updateUsers(req, res){

    }
    async deleteUsers(req, res){

    }

}

module.exports = new UserController()