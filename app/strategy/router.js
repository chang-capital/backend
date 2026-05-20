const router = express.Router()
const { getRsi } = require('./controller')

router.get('/rsi', getRsi)

module.exports = router