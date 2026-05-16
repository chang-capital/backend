const dotenv = require("dotenv")

dotenv.config()

module.exports = {
    binanceApiKeyTest: process.env.BINANCE_API_KEY_TEST,
    binanceSecretKeyTest: process.env.BINANCE_SECRET_KEY_TEST,
    binaneApiKeyMain: process.env.BINANCE_API_KEY_MAIN,
    binanceSecretKeyMain: process.env.BINANCE_SECRET_KEY_MAIN
}