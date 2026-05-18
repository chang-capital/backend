const express = require('express')
const router = express.Router()
const { account } = require('./controller')

router.get('/account', account)

module.exports = router