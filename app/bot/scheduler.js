const cron = require('node-cron')
const { calculateRsi } = require("../strategy/controller")
const { symbolPrice } = require("../utils")
const { marketOrderSell, marketOrderBuy } = require("../spot/controller")

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
                await marketOrderBuy(100)
            } else if(rsi < 20) {
                console.log('RSI extremely oversold → BUY!')
                await marketOrderBuy(200)
            } else if (rsi > 70) {
                console.log('RSI overbought → SELL!')
                await marketOrderSell(100)
            } else if(rsi > 80) {
                console.log('RSI extremely overbought → SELL!')
                await marketOrderSell(200)
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