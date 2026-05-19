const { Spot } = require('@binance/connector')
const { minQty, amountToQuantity, symbolPrice } = require("../utils")
const { binanceApiKeyTest, binanceSecretKeyTest } = require('../../config')

const test = new Spot(binanceApiKeyTest, binanceSecretKeyTest, {
    baseURL: 'https://testnet.binance.vision'
})

module.exports = {
    placeMarketOrder: async(req, res) => {
        try {
            const { amount } = req.body

            const minNotValueCount = await minQty("BTCUSDT")
            const price = await symbolPrice("BTCUSDT")
            const quantity = await amountToQuantity(amount, price, minNotValueCount)

            const client = new Spot(binanceApiKeyTest, binanceSecretKeyTest, {
                baseURL: 'https://testnet.binance.vision'  // ✅ tambah baseURL
            })
            const response = await client.newOrder('BTCUSDT', 'BUY', 'MARKET', {
                quantity: quantity,
            })
            res.status(200).json({
                data: response.data
            })
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message  // tampilkan error dari Binance
            }); 
        }
    }
}