const Ads = require('../models/Ads/Ads')

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
    }

}

module.exports = SearchController