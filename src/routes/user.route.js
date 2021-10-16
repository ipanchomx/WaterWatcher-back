const express = require("express");
const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/signup')
    .post(userController.createUser);

router.post("/login", userController.login);

router.get('/getUser/:id', userController.getUser);

module.exports = router;
