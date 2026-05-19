const express = require('express')
const router = express.Router()
const { placeMarketOrderSell, placeMarketOrderBuy, placeLimitOrderSell, placeLimitOrderBuy } = require('./controller')

router.post('/place-market-order-sell', placeMarketOrderSell)
router.post('/place-market-order-buy', placeMarketOrderBuy)
router.post('/place-limit-order-sell', placeLimitOrderSell)
router.post('/place-limit-order-buy', placeLimitOrderBuy)

module.exports = router