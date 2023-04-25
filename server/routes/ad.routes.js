const Router = require('express')
const router = new Router()
const adController = require('../controllers/ad.controller')
const authMiddlewares = require('../middlewares/auth-middleware')

router.post('/checking', adController.addItem)
router.get('/getTypes', adController.sendType)
router.post('/create-type-ad', adController.createNewTypeAd)

module.exports = router