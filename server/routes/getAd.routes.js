const Router = require('express')
const router = new Router()
const adController = require('../controllers/ad.controller')
const authMiddlewares = require('../middlewares/auth-middleware')

router.post('/:id', adController.getInfoAboutAd)
router.post('/up/:id', adController.upAd)
router.post('/removeUp/:id', adController.removeUp)


module.exports = router