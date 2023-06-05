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
    city:{
        type: String
    },
    up:{
        type: Boolean
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

module.exports = model('CarSchema', CarSchema)