const express = require("express");
const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/signup')
    .post(userController.createUser);


module.exports = router;
