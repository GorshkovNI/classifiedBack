const { Schema, model } = require('mongoose')

const WorkSchema = new Schema({
    title:{
        type:String
    },
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    typeWork: {
        type: String,
        required: true
    },
    exrepiens:{
        type: String,
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

module.exports = model('WorkSchema', WorkSchema)