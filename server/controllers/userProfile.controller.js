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
            const review = await Review.findOne({user_id: user_id})
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
            const user_id = req.params.id
            const newReview = req.body
            const foundReview = await Review.findOne({user_id: user_id})

            if(foundReview){
                const isExist = foundReview.review.find(item => item.user_id === newReview.review.user_id)
                console.log('newReview user id ', newReview.review)
                console.log(isExist)
                if(isExist){
                    res.json('Уже есть отзыв')
                    return
                }
                const tempRev = newReview.review
                await foundReview.updateOne({$push: {review: tempRev}})
                await foundReview.updateOne({$set: {count: foundReview.count + 1, totalRating: foundReview.totalRating + newReview.review.rating}})
                res.json('ok')
            }
            else{
                const newUserReview = new Review({user_id: user_id, count: '1', totalRating: newReview.review.rating, review: newReview.review})
                await newUserReview.save()
            }

        }catch (e){
            console.log(e)
            next(e)
        }
    },
}

module.exports = AdController