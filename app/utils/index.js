const { Spot } = require('@binance/connector')
const { binanceApiKeyTest, binanceSecretKeyTest } = require('../../config')

const test = new Spot(binanceApiKeyTest, binanceSecretKeyTest, {
    baseURL: 'https://testnet.binance.vision'
})

module.exports = {
    symbolPrice: async(symbol) => {
        const response = await test.tickerPrice(symbol)
        return parseFloat(response.data.price) // return angkanya langsung
    },
    minQty: async(symbol) => {
        const coinInfo = await test.exchangeInfo({ symbol: symbol })
        
        const lotSize = coinInfo.data.symbols[0].filters.find(f => f.filterType === 'LOT_SIZE')
        const stepSize = parseFloat(lotSize.stepSize).toString()
        const decimals = stepSize.includes('.') ? stepSize.split(".")[1].length : 0

        console.log('stepSize:', lotSize.stepSize, '→ decimals:', decimals)
        return decimals
    },
    amountToQuantity: async(amount, price, minNotValueCount) => {
        const raw = (1 / price) * amount
        const factor = Math.pow(10, minNotValueCount)
        const quantity = Math.floor(raw * factor) / factor  // bulatkan ke bawah sesuai stepSize
        
        console.log({ raw, factor, quantity, minNotValueCount })
        return quantity.toFixed(minNotValueCount)
    }
}