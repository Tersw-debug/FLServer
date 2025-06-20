const express = require("express");
const router = express.Router();
const usersController = require('./controllers/usersController');
const verfiyRoles = require('./verfiyRoles');
const Roles_list = require('./config/rolesList');

router.route('/')
    .get(verfiyRoles(Roles_list.Admin),usersController.getAllusers)
    .delete(verfiyRoles(Roles_list.Admin), usersController.deleteSomeUser);

router.route('/:id')
    .get(verfiyRoles(Roles_list.Admin),usersController.getSomeUser);

module.exports = router;