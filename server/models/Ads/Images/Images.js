const { Schema, model } = require('mongoose')

const Images = new Images({
    url: {type: String},
    ads: {
        type: String,
        ref: 'Ads'
    }
})

module.exports = model('Images', Images)