const { Schema, model } = require('mongoose')

const Review = new Schema({
    user_id: {
        type: String,
        ref: 'User'
    },
    count: {
        type: String
    },
    totalRating:{
        type: String
    },
    review: {
        type: Array
    }


})

module.exports = model('Review', Review)