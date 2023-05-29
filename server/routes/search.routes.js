const Router = require('express')
const router = new Router()
const searchController = require('../controllers/search.controller')


router.post('/', searchController.search)
router.post('/adsByCity', searchController.searchByCity)
router.post('/transport', searchController.transport)
router.post('/rent', searchController.rent)


module.exports = router