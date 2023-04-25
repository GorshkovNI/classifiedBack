const ApiError = require('../exceptions/api-errors')
const Ads = require('../models/Ads/Ads')
const Cars = require('../models/Ads/Car/Car')
const TypeAd = require('../models/TypeAd/TypeAd')
const carInputs = require("../models/Ads/Car/carObjectField");

const AdController = {
    async addItem(req, res, next) {
        try {
            const { type } = req.body
            switch (type) {
                case 'auto':
                    const { title, year, generation, mileage,
                        owners, modification, engineCapacity,
                        gearbox, drive, equipment, body,
                        color, wheel, vin, user } = req.body

                    const car = new Cars({title, year, generation, mileage,
                        owners, modification, engineCapacity,
                        gearbox, drive, equipment, body,
                        color, wheel, vin, user})
                    
                    await car.save()
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