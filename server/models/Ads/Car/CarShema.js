const { Schema, model } = require('mongoose')

const CarSchema = new Schema({
    title:{
      type:String
    },
    marka: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    registrationnubmer:{
        type: String,
    },
    vin:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    mileage:{
        type: String,
        required: true
    },
    owners:{
        type: String,
        required: true
    },
    isCrash:{
        type: String,
        required: true
    },
    photos: Array,
    description:{
        type: String
    },
    price:{
        type: String
    },
    user_id: {
        type: String,
        ref: 'User'
    },
})

module.exports = model('CarSchema', CarSchema)