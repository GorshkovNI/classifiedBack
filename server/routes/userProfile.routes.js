const Router = require('express')
const router = new Router()
const authMiddlewares = require('../middlewares/auth-middleware')
const getProfileInfo = require("../controllers/userProfile.controller");

router.get('/:id', authMiddlewares, getProfileInfo.getProfileInfo)

module.exports = router