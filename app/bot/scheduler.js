const cron = require('node-cron')
const { calculateRsi } = require("../strategy/controller")
const { symbolPrice } = require("../utils")
const { marketOrderSell, marketOrderBuy, limitOrderSell, limitOrderBuy } = require("../spot/controller")

const startBotRsi = () => {

}

module.exports = {
    startBotRsi
}