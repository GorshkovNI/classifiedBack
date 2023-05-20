const ApiError = require('../exceptions/api-errors')
const Ads = require('../models/Ads/Ads')
const TypeAd = require('../models/TypeAd/TypeAd')
const User = require("../models/User/User");
const CarSchema = require('../models/Ads/Car/CarShema')
const AdService = require("../servise/ad-service");
const Review = require("../models/User/Review/Rewiew")

const AdController = {

    async getProfileInfo(req, res, next){
        try {
            const user_id = req.params.id
            const user = await User.find({_id: user_id})
            const ads = await Ads.find({user_id})
            const review = await Review.findOne({user_id: user.id})
            const info = {
                user,
                ads,
                review
            }
            res.send(info)
        }catch (e){
            next(e)
        }
    },
    async setReview(req, res, next){
        try {
            console.log('1')
            const review = req.body
            console.log(review)
            //const newReview = await Review.findOne({user_id: user_id})

        }catch (e){
            console.log(e)
            next(e)
        }
    },
}

module.exports = AdController