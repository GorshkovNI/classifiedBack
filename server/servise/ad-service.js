const TypeAd = require("../models/TypeAd/TypeAd");
const CarSchema = require("../models/Ads/Car/CarShema");
const Ads = require("../models/Ads/Ads");

const category = {
    'car': CarSchema
}

const AdService = {
    async addItem(category, title, marka, model, year, registrationnubmer, vin, color,
                  mileage, owners, isCrash, photos, description, price, user_id){

        const category_id = await TypeAd.findOne({category}, {_id: 1})

        const newAd = new Ads({title, description, price, photos, user_id, category_id})
        const carAds = new CarSchema({title, category, marka, model, year,
            registrationnubmer, vin, color,
            mileage, owners, isCrash, photos, description, price, user_id, category_id, ads_id: newAd._id})

        await newAd.save()
        await carAds.save()

        return true
    },

    async getAd(id){
        const categoryId = await Ads.findOne({_id: id}, {category_id: 1})
        const categoryName = await TypeAd.findOne({categoryId: categoryId})
        const currentAd = await category[categoryName].findOne({ads_id: id})
        console.log(currentAd)
    }

}

module.exports = AdService