const { RSI } = require('technicalindicators')
const { binanceApiKeyTest, binanceSecretKeyTest } = require('../../config')

const test = new Spot(binanceApiKeyTest, binanceSecretKeyTest, {
    baseURL: 'https://testnet.binance.vision'
})

module.exports = {
    calculateRsi: async(symbol, interval = '1h', period = 14) => {
        // ambil candlestick
        const klines = await test.klines(symbol, interval, { limit: period + 50 })

        // ambil closing price
        const closingPrices = klines.data.map(candle => parseFloat(candle[4]))

        // hitung RSI
        const rsiValues = RSI.calculate({
            values: closingPrices,
            period: period
        })

        // ambil RSI terakhir
        const currentRSI = rsiValues[rsiValues.length - 1]

        return parseFloat(currentRSI.toFixed(2))
    }
}