const { Spot } = require('@binance/connector')
const { minQty, amountToQuantity, symbolPrice } = require("../utils")
const { binanceApiKeyTest, binanceSecretKeyTest } = require('../../config')

const test = new Spot(binanceApiKeyTest, binanceSecretKeyTest, {
    baseURL: 'https://testnet.binance.vision'
})

const marketOrderSell = async(amount) => {
    const minNotValueCount = await minQty("BTCUSDT")
    const price = await symbolPrice("BTCUSDT")
    const quantity = await amountToQuantity(amount, price, minNotValueCount)

    const response = await test.newOrder('BTCUSDT', 'SELL', 'MARKET', {
        quantity: quantity,
    })
    return response.data
}

const marketOrderBuy = async(amount) => {
    const minNotValueCount = await minQty("BTCUSDT")
    const price = await symbolPrice("BTCUSDT")
    const quantity = await amountToQuantity(amount, price, minNotValueCount)

    const response = await test.newOrder('BTCUSDT', 'BUY', 'MARKET', {
        quantity: quantity,
    })
    return response.data
}

const limitOrderSell = async(amount, price) => {
    const minNotValueCount = await minQty("BTCUSDT")
    const quantity = await amountToQuantity(amount, price, minNotValueCount)

    const response = await test.newOrder('BTCUSDT', 'SELL', 'LIMIT', {
        price: price,
        quantity: quantity,
        timeInForce: 'GTC'
    })
    return response.data
}

const limitOrderBuy = async(amount, price) => {
    const minNotValueCount = await minQty("BTCUSDT")
    const quantity = await amountToQuantity(amount, price, minNotValueCount)

    const response = await test.newOrder('BTCUSDT', 'BUY', 'LIMIT', {
        price: price,
        quantity: quantity,
        timeInForce: 'GTC'
    })
    return response.data
}

module.exports = {
    marketOrderSell,
    marketOrderBuy,
    limitOrderSell,
    limitOrderBuy,
    // route handler
    placeMarketOrderSell: async(req, res) => {
        try {
            const { amount } = req.body

            const minNotValueCount = await minQty("BTCUSDT")
            const price = await symbolPrice("BTCUSDT")
            const quantity = await amountToQuantity(amount, price, minNotValueCount)

            const response = await test.newOrder('BTCUSDT', 'SELL', 'MARKET', {
                quantity: quantity,
            })
            res.status(200).json({
                data: response.data
            })
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message
            });
        }
    },
    placeMarketOrderBuy: async(req, res) => {
        try {
            const { amount } = req.body

            const minNotValueCount = await minQty("BTCUSDT")
            const price = await symbolPrice("BTCUSDT")
            const quantity = await amountToQuantity(amount, price, minNotValueCount)

            const response = await test.newOrder('BTCUSDT', 'BUY', 'MARKET', {
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
    },
    placeLimitOrderSell: async(req, res) => {
        try {
            const { amount, price } = req.body

            const minNotValueCount = await minQty("BTCUSDT")
            const quantity = await amountToQuantity(amount, price, minNotValueCount)

            const response = await test.newOrder('BTCUSDT', 'SELL', 'LIMIT', {
                price: price,
                quantity: quantity,
                timeInForce: 'GTC'
            })
            res.status(200).json({
                data: response.data
            })
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message
            }); 
        }
    },
    placeLimitOrderBuy: async(req, res) => {
        try {
            const { amount, price } = req.body

            const minNotValueCount = await minQty("BTCUSDT")
            const quantity = await amountToQuantity(amount, price, minNotValueCount)

            const response = await test.newOrder('BTCUSDT', 'BUY', 'LIMIT', {
                price: price,
                quantity: quantity,
                timeInForce: 'GTC'
            })
            res.status(200).json({
                data: response.data
            })
        } catch (error) {
            res.status(500).json({ 
                message: "Internal Server Error",
                error: error.response?.data || error.message
            }); 
        }
    }
}