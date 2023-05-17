const Router = require('express')
const router = new Router()
const authMiddlewares = require('../middlewares/auth-middleware')
const getProfileInfo = require("../controllers/userProfile.controller");

router.get('/:id',  getProfileInfo.getProfileInfo)

module.exports = router