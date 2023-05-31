const ApiError = require('../exceptions/api-errors')
const Ads = require('../models/Ads/Ads')
const TypeAd = require('../models/TypeAd/TypeAd')
const User = require("../models/User/User");
const CarSchema = require('../models/Ads/Car/CarShema')
const AdService = require("../servise/ad-service");
const RentShema = require("../models/Ads/Rent/Rent")
const WorkShema = require("../models/Ads/Work/Work")

const AdController = {
    async addItem(req, res, next) {
        try {
            const { category } = req.body.data
            switch (category){
                case 'car':
                    try {
                        const { title, marka, model, year,
                            registrationnubmer, vin, color,
                            mileage, owners, isCrash, photos, description, price, city, user_id} = req.body.data

                        const newAd = await AdService.addItemCar(category, title, marka, model, year,
                            registrationnubmer, vin, color,
                            mileage, owners, isCrash, photos, description, price, city, user_id)
                        res.json(newAd)
                    } catch (e) {
                        next(e)
                    }
                    break;
                case 'rent':

                    try {
                        const  {title, city, rooms, square, squareKitchen, floor, totalFloor, bathroom,  photos,description, price, category, user_id} = req.body.data
                        console.log(req.body.data)
                        const newAd = await AdService.addItemRent(req.body.data)
                        res.json(newAd)
                    }catch (e) {
                        next(e);
                    }
                    break;
                case 'work':
                    try {
                        const newAd = await AdService.addItemWork(req.body.data)
                        res.json(newAd)
                    }catch (e){
                        next(e);
                    }
                    break;
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
            const {category} = req.body
            const isExist = await TypeAd.findOne({category})
            if(isExist){
                throw 'Такая категория уже есть'
            }
            const newTypeAd = new TypeAd(req.body)
            await newTypeAd.save()
        } catch (e){
            next(e)
        }
    },

    async deleteAd(req, res, next){
        try {
            const {categoryId, ads_id} = req.body
            const type = await TypeAd.findOne({_id: categoryId}, {category: 1})
            console.log(type.category)
            switch (type.category){
                case 'car':
                    await CarSchema.deleteOne({ads_id: ads_id})
                    await Ads.deleteOne({_id: ads_id})
                    res.json('ok')
                break
                case 'rent':
                    await RentShema.deleteOne({ads_id: ads_id})
                    await Ads.deleteOne({_id: ads_id})
                    res.json('ok')
                case 'work':
                    await WorkShema.deleteOne({ads_id: ads_id})
                    await Ads.deleteOne({_id: ads_id})
                    res.json('ok')
                    break
            }
        }catch (e){
            next(e)
        }
    },

    async changeAvatar(req, res, next){
        try {
            const {avatar, user_id} = req.body
            const user = await User.findOne({_id: user_id})
            await user.updateOne({$set: {photo: avatar}})
            res.send(true)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = AdController