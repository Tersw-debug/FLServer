const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require(path.join(__dirname,'controllers','usersController.js'));

router.post('/', registerController.handleNewUser);

module.exports = router;