const ApiError = require('../exceptions/api-errors')
const Ads = require('../models/Ads/Ads')
const TypeAd = require('../models/TypeAd/TypeAd')
const User = require("../models/User/User");
const CarSchema = require('../models/Ads/Car/CarShema')
const AdService = require("../servise/ad-service");

const AdController = {

    async getProfileInfo(req, res, next){
        try {
            const user_id = req.params.id
            const user = await User.find({_id: user_id})
            const ads = await Ads.find({user_id})
            const info = {
                user,
                ads
            }
            res.send(info)
        }catch (e){
            next(e)
        }
    },
}

module.exports = AdController