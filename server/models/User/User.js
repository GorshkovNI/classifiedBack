const { Schema, model } = require('mongoose')

const User = new Schema({
    name: {type: String},
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    password: {type: String},
    dateRegistration: {type: Number},
    roles: [{type: String, ref: 'Role'}]
    
})

module.exports = model('User', User)