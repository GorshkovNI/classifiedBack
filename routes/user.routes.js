const Router = require('express')

const router = new Router()
const userController = require('../controllers/user.controller')

router.post('/user', userController.createUser)
router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.getOneUsers)
router.put('/user', userController.updateUsers)
router.delete('/user:id', userController.deleteUsers)


module.exports = router