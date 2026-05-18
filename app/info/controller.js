const { Spot } = require('@binance/connector')
const { binanceApiKeyTest, binanceSecretKeyTest } = require('../../config')

const test = new Spot(binanceApiKeyTest, binanceSecretKeyTest, {
    baseURL: 'https://testnet.binance.vision'
})

module.exports = {
    account: async(req, res) => {
        try {
            test.account().then(response => {
                res.status(200).json({ data: response.data })
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}