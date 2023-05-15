const { Schema, model } = require('mongoose')

const User = new Schema({
    name: {type: String},
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    password: {type: String},
    dateRegistration: {type: Number},
    activateLink: {type: String},
    isActivate: {type: Boolean},
    roles: [{type: String, ref: 'Role'}]
    
})

module.exports = model('User', User)