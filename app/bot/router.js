const express = require('express')
const router = express.Router()
const { startBotRsi, stopBotRsi, botStatusRsi } = require('./scheduler')

// start bot
router.post('/start-rsi', (req, res) => {
    const started = startBotRsi()
    res.status(200).json({
        message: started ? 'Bot started' : 'Bot sudah berjalan',
        status: botStatusRsi()
    })
})

// stop bot
router.post('/stop-rsi', (req, res) => {
    const stopped = stopBotRsi()
    res.status(200).json({
        message: stopped ? 'Bot stopped' : 'Bot tidak sedang berjalan',
        status: botStatusRsi()
    })
})

// cek status bot
router.get('/status-rsi', (req, res) => {
    res.status(200).json({
        status: botStatusRsi(),
        message: botStatusRsi() ? 'Bot sedang berjalan' : 'Bot tidak aktif'
    })
})

module.exports = router