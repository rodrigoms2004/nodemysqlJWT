const express = require('express')
const router = express.Router()

// routes to API
router.use('/api', require('./api'))

module.exports = router;