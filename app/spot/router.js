const express = require('express')
const router = express.Router()
const { placeMarketOrder, placeLimitOrderSell } = require('./controller')

router.post('/place-market-order', placeMarketOrder)
router.post('/place-limit-order-sell', placeLimitOrderSell)

module.exports = router