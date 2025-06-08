const express = require('express');
const router = express.Router();
const path = require('path');
const refreshController = require(path.join(__dirname, 'controllers', 'refreshToken.js'));

router.get('/', refreshController.handleRefreshToken);

module.exports = router;