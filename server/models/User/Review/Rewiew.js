const { Schema, model } = require('mongoose')

const Review = new Schema({
    user_id: {
        type: String,
        ref: 'User'
    },
    count: {
        type: Number
    },
    totalRating:{
        type: Number
    },
    review: {
        type: Array
    }


})

module.exports = model('Review', Review)