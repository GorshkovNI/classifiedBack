const { Schema, model } = require('mongoose')

const Ads = new Schema({
    username: {type: String},
    numberAds: {type: Number},
    user: {
        type: String,
        ref: 'User'
    }
})

module.exports = model('Ads', Ads)