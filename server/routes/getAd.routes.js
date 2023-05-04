const Router = require('express')
const router = new Router()
const adController = require('../controllers/ad.controller')
const authMiddlewares = require('../middlewares/auth-middleware')

router.post('/ad/:id', adController.getInfoAboutAd)


module.exports = router