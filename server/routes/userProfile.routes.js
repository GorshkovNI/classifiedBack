const Router = require('express')
const router = new Router()
const authMiddlewares = require('../middlewares/auth-middleware')
const getProfileInfo = require("../controllers/userProfile.controller");

router.get('/:id',  getProfileInfo.getProfileInfo)
router.post('/review/:id',  getProfileInfo.setReview)


module.exports = router