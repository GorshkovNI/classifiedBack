const Router = require('express')
const router = new Router()
const authMiddlewares = require('../middlewares/auth-middleware')
const getProfileInfo = require("../controllers/userProfile.controller");

router.get('/:id',  getProfileInfo.getProfileInfo)
router.get('/review',  getProfileInfo.setReview)


module.exports = router