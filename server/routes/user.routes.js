const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const adController = require('../controllers/ad.controller')
const {body} = require('express-validator')
const authMiddlewares = require('../middlewares/auth-middleware')
const errorMiddlewares = require('../middlewares/error-middlewares')


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 20 }),
    userController.registration
    )
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)
router.get('/users', authMiddlewares, userController.getUsers)
router.post('/checking', adController.addItem)
router.post('/changeAvatar', adController.changeAvatar)

module.exports = router