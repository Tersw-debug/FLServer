const express = require('express');
const path = require('path');
const router = express.Router();
const employeesController = require(path.join(__dirname, 'controllers', 'employeesController.js'));
const ROLES_LIST = require(path.join(__dirname, 'config', 'rolesList.js'));
const verfiyRoles = require(path.join(__dirname,'verfiyRoles.js'));

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verfiyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;
