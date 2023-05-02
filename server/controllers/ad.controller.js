const ApiError = require('../exceptions/api-errors')
const Ads = require('../models/Ads/Ads')
const TypeAd = require('../models/TypeAd/TypeAd')
const User = require("../models/User/User");
const CarSchema = require('../models/Ads/Car/CarShema')

const AdController = {
    async addItem(req, res, next) {
        try {
            const { category } = req.body.data
            console.log(category)
            switch (category){
                case 'car':
                    const category_id = await TypeAd.findOne({category}, {_id: 1})
                    const { title, marka, model, year,
                        registrationnubmer, vin, color,
                        mileage, owners, isCrash, photos, description, price, user_id} = req.body.data

                    const carAds = new CarSchema({title, category, marka, model, year,
                        registrationnubmer, vin, color,
                        mileage, owners, isCrash, photos, description, price, user_id, category_id})

                    const newAd = new Ads({title, description, price, photos, user_id})

                    await carAds.save()
                    await newAd.save()
                    res.json('Объявление сохранено')
            }
        }
        catch (e) {
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
            console.log(category)
            console.log(fields)
            res.send(fields)
        }catch (e){
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
            console.log(newTypeAd)
            await newTypeAd.save()
        } catch (e){
            next(e)
        }
    }
}

module.exports = AdController