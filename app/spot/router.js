const express = require('express')
const router = express.Router()
const { placeMarketOrder } = require('./controller')

router.post('/place-market-order', placeMarketOrder)

module.exports = router