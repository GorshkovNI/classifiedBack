const TypeAd = require("../models/TypeAd/TypeAd");
const CarSchema = require("../models/Ads/Car/CarShema");
const Ads = require("../models/Ads/Ads");

const AdService = {
    async addItem(category, title, marka, model, year, registrationnubmer, vin, color,
                  mileage, owners, isCrash, photos, description, price, user_id){

        const category_id = await TypeAd.findOne({category}, {_id: 1})
        const carAds = new CarSchema({title, category, marka, model, year,
            registrationnubmer, vin, color,
            mileage, owners, isCrash, photos, description, price, user_id, category_id})

        const newAd = new Ads({title, description, price, photos, user_id, category_id})

        await carAds.save()
        await newAd.save()
        return true
    }
}

module.exports = AdService