const { symbolPrice, minQty, amountToQuantity } = require("../utils")

module.exports = {
    symbolPrice: async(req, res) => {
        try {
            const price = await symbolPrice('BTCUSDT')
            res.json({ message: 'Test successful', price })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })    
        }
    },
    minQty: async(req, res) => {
        try {
            const decimals = await minQty('BTCUSDT')
            res.json({ message: 'Test successful', decimals })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })    
        }
    },
    amountToQuantity: async(req, res) => {
        try {
            const { amount, price, minNotValueCount } = req.body
            const quantity = await amountToQuantity(parseFloat(amount), parseFloat(price), parseInt(minNotValueCount))
            res.json({ message: 'Test successful', quantity })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}