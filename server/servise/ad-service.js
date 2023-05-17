const TypeAd = require("../models/TypeAd/TypeAd");
const CarSchema = require("../models/Ads/Car/CarShema");
const RentSchema = require("../models/Ads/Rent/Rent")
const Ads = require("../models/Ads/Ads");
const User = require("../models/User/User");

const categoryTypes = {
    'car': CarSchema,
    'rent': RentSchema
}

const AdService = {
    async addItemCar(category, title, marka, model, year, registrationnubmer, vin, color,
                  mileage, owners, isCrash, photos, description, price, city, user_id){

        const category_id = await TypeAd.findOne({category}, {_id: 1})

        const newAd = new Ads({title, description, price, photos, user_id, city, categoryId: category_id})
        const carAds = new CarSchema({title, category, marka, model, year,
            registrationnubmer, vin, color,
            mileage, owners, isCrash, photos, description, price, city, user_id, category_id, ads_id: newAd['_id']})

        await newAd.save()
        await carAds.save()
        return true
    },

    async addItemRent(data){

        const {
            title,
            city, rooms, square, squareKitchen, floor, totalFloor, bathroom, photos, description, price, user_id, category
        } = data

        const category_id = await TypeAd.findOne({category}, {_id: 1})

        const newAd = new Ads( {title, description, price, photos, user_id, city, categoryId: category_id} )
        const rentAds = new RentSchema({title, city, rooms, square, squareKitchen, floor, totalFloor,
            bathroom, photos, description, price, user_id, category, category_id, ads_id: newAd['_id']})

        await newAd.save()
        await rentAds.save()


        return true
    },

    async getAd(id){
        const ad = await Ads.findOne({_id: id}, {categoryId: 1})
        const categoryName = await TypeAd.findOne({_id: ad.categoryId} , {category: 1, fields: 1})
        const currentAd = await categoryTypes[categoryName.category].findOne({ads_id: id})
        const userId = currentAd.user_id
        const user = await User.findOne({_id: userId})
        return {currentAd, user, categoryName}
    }

}

module.exports = AdService