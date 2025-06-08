const express = require('express');
const path = require('path');
const router = express.Router();
const mvcContlloer = require(path.join(__dirname, 'controllers', 'employeesController.js'));

router.route('/')
    .get(mvcContlloer.getAllEmployees)
    .post(mvcContlloer.postAllEmployees)
    .put(mvcContlloer.updateAllEmployees)
    .delete(mvcContlloer.deleteAllEmployees);

    router.route('/:id')
    .get(mvcContlloer.getEmployee);

module.exports = router;
