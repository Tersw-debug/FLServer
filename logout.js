const express = require('express');
const router = express.Router();
const path = require('path');
const handlelogout = require(path.join(__dirname, 'controllers', 'logout.js'));

router.get('/', handlelogout.handlelogout);

module.exports = router;