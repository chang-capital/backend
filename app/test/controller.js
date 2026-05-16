module.exports = {
    test: async(req, res) => {
        try {
            res.json({ message: 'Test successful' })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}