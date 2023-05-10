const ApiError = require('../exceptions/api-errors')
const Ads = require('../models/Ads/Ads')
const TypeAd = require('../models/TypeAd/TypeAd')
const User = require("../models/User/User");
const CarSchema = require('../models/Ads/Car/CarShema')
const AdService = require("../servise/ad-service");

const AdController = {
    async addItemCar(req, res, next) {
        try {
            const { category } = req.body.data
            switch (category){
                case 'car':
                    try {
                        const { title, marka, model, year,
                            registrationnubmer, vin, color,
                            mileage, owners, isCrash, photos, description, price, user_id} = req.body.data

                        const newAd = await AdService.addItemCar(category, title, marka, model, year,
                            registrationnubmer, vin, color,
                            mileage, owners, isCrash, photos, description, price, user_id)

                        res.json(newAd)
                    } catch (e) {
                        next(e)
                    }
            }
        }
        catch (e) {
            next(e)
        }

    },

    async getAllAds(req, res, next){
        try {
            const {user_id} = req.body
            console.log(user_id)
            const ads = await Ads.find({user_id})
            res.send(ads)
        }catch (e){
            next(e)
        }
    },

    async sendType(req, res, next){
        try {
            const types = await TypeAd.find({}, {category: 1, translate: 1})
            res.send(types)
        }
        catch (e){
            next(e)
        }
    },

    async getFieldsAd(req, res, next){
        try {
            const {category} = req.body
            const fields = await TypeAd.findOne({category}, {fields: 1})
            res.send(fields)
        }catch (e){
            next(e)
        }
    },

    async getInfoAboutAd(req, res, next){
        try {
            const {id} = req.body
            const infoAd = await AdService.getAd(id)
            res.send(infoAd)
        } catch (e){
            next(e)
        }
    },

    async createNewTypeAd(req, res, next){
        try {
            const {type} = req.body
            const isExist = await TypeAd.findOne({type})
            if(isExist){
                throw 'Такая категория уже есть'
            }
            const newTypeAd = new TypeAd(req.body)
            await newTypeAd.save()
        } catch (e){
            next(e)
        }
    },
}

module.exports = AdController