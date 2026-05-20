const cron = require('node-cron')
const { calculateRsi } = require("../strategy/controller")
const { symbolPrice } = require("../utils")
const { marketOrderSell, marketOrderBuy, limitOrderSell, limitOrderBuy } = require("../spot/controller")

let botTaskRsi = null

const startBotRsi = () => {
    if (botTaskRsi) return false  // bot sudah jalan

    botTaskRsi = cron.schedule('0 * * * *', async() => {
        try {
            const symbol = 'BTCUSDT'
            const rsi = await calculateRsi(symbol, '1h', 14)
            const price = await symbolPrice(symbol)

            console.log(`RSI: ${rsi} | Harga: ${price}`)

            if (rsi < 30) {
                console.log('RSI oversold → BUY!')
            } else if (rsi > 70) {
                console.log('RSI overbought → SELL!')
            } else {
                console.log('RSI normal → HOLD')
            }
        } catch (error) {
            console.error('Bot error:', error)
        }
    })

    return true
}

const stopBotRsi = () => {
    if (!botTaskRsi) return false  // bot tidak jalan

    botTaskRsi.stop()
    botTaskRsi = null
    return true
}

const botStatusRsi = () => botTaskRsi !== null

module.exports = {
    startBotRsi,
    stopBotRsi,
    botStatusRsi
}