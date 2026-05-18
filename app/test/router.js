const express = require('express')
const router = express.Router()
const { symbolPrice, minQty, amountToQuantity } = require('./controller')

router.get('/symbolPrice', symbolPrice)
router.get('/minQty', minQty)
router.post('/amountToQuantity', amountToQuantity)

module.exports = router