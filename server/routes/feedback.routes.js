const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedback.controller')

router.post('/feedback', feedbackController.feedback)

module.exports = router