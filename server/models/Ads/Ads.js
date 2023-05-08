const { Schema, model } = require('mongoose')

const Ads = new Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    price:{
      type: String
    },
    photos: Array,
    user_id: {
        type: String,
        ref: 'User'
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: 'TypeAd'
    }
})

module.exports = model('Ads', Ads)