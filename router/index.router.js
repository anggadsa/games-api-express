const express = require('express');
const router = express.Router();
const { authenticate } = require('../misc/middleware');
const gameRoutes = require('./games.route');

router.use('/games', authenticate, gameRoutes);

module.exports = router;