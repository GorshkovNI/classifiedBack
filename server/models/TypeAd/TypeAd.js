const { Schema, model } = require('mongoose')

const TypeAd = new Schema({
    category: String,
    translate: String,
    subcategory: String,
    fields: Array
})

module.exports = model('TypeAd', TypeAd)