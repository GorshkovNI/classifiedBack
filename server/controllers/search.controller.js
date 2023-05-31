const Ads = require('../models/Ads/Ads')
const CarShema = require('../models/Ads/Car/CarShema')
const RentSchema = require('../models/Ads/Rent/Rent')
const WorkSchema = require('../models/Ads/Work/Work')
const TypeAd = require('../models/TypeAd/TypeAd')

const SearchController = {
    async search(req, res, next){
        try{
            console.log('Пришел запрос по поиску объявлений')
            const {text} = req.body
            const result = await Ads.aggregate([
                {
                    $search: {
                        index: "search",
                        text: {
                            query: text,
                            //query: "<query>",
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
                ])
            console.log(result)
            res.json(result)
        }catch (e){
            next(e)
        }
    },

    async searchByCity(req, res, next){
        try {
            const {city} = req.body
            const result = await Ads.aggregate([
                {
                    $search: {
                        index: "searchByCity",
                        text: {
                            query: city,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ])
            res.json(result)
        }catch (e){
            next(e)
        }
    },

    async transport(req, res, next){
        try{
            const city = req.body.city
            const ads = await CarShema.find({city: {'$regex': city}})
            res.json(ads)
        }catch(e){

            next(e)
        }
    },

    async rent(req, res, next){
        try {
            const city = req.body.city
            const ads = await RentSchema.find({city: {'$regex': city}})
            res.json(ads)
        }catch (e){
            next(e)
        }
    },

    async work(req, res, next){
        try {
            const city = req.body.city
            const ads = await WorkSchema.find({city: {'$regex': city}})
            res.json(ads)
        }catch (e){
            next(e)
        }
    },


}

module.exports = SearchController