const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')
const adController = require('../controllers/ad.controller')
const {body} = require('express-validator')
const authMiddlewares = require('../middlewares/auth-middleware')
const errorMiddlewares = require('../middlewares/error-middlewares')


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 8 }),
    userController.registration
    )
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)
router.get('/users', authMiddlewares, userController.getUsers)
router.post('/checking', adController.addItem)
router.post('/changeAvatar', adController.changeAvatar)

// router.post('/user', userController.createUser)
// router.get('/user', userController.getAllUsers)
// router.get('/user/:id', userController.getOneUsers)
// router.put('/user', userController.updateUsers)
// router.delete('/user:id', userController.deleteUsers)


module.exports = router