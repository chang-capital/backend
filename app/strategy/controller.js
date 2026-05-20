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
    },
    getRsi: async(req, res) => {
        try {
            const { symbol, interval, period } = req.body

            const rsi = await calculateRSI(
                symbol || 'BTCUSDT',
                interval || '1h',
                period || 14
            )

            res.status(200).json({
                data: {
                    symbol,
                    interval,
                    rsi,
                    signal: rsi < 30 ? 'BUY' : rsi > 70 ? 'SELL' : 'HOLD'
                }
            })
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message
            });
        }
    }
}