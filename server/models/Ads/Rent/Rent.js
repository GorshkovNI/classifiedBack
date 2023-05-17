const { Schema, model } = require('mongoose')

const RentSchema = new Schema({
    title:{
        type:String
    },
    city: {
        type: String,
        required: true
    },
    rooms: {
        type: String,
        required: true
    },
    square: {
        type: String,
        required: true
    },
    squareKitchen:{
        type: String,
    },
    floor:{
        type: String,
        required: true
    },
    totalFloor:{
        type: String,
        required: true
    },
    bathroom: {
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
    category_id:{
        type: String,
        ref: 'TypeAd'
    },
    ads_id:{
        type: Schema.Types.ObjectId,
        ref: 'Ads'
    }
})

module.exports = model('RentSchema', RentSchema)