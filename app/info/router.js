const express = require('express')
const router = express.Router()
const { account, listenOrders } = require('./controller')

router.get('/account', account)
router.get('/listen-orders', listenOrders)

module.exports = router