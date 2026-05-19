const express = require('express')
const router = express.Router()
const { placeMarketOrder, placeLimitOrderSell, placeLimitOrderBuy } = require('./controller')

router.post('/place-market-order', placeMarketOrder)
router.post('/place-limit-order-sell', placeLimitOrderSell)
router.post('/place-limit-order-buy', placeLimitOrderBuy)

module.exports = router