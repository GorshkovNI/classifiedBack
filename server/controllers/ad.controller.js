const ApiError = require('../exceptions/api-errors')
const Ads = require('../models/Ads/Ads')
const Cars = require('../models/Ads/Car/Car')

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
}

module.exports = AdController