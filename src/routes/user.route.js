const express = require("express");
const userController = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/signup', userController.createUser);

router.post("/login", userController.login);

router.get('/getUser', authMiddleware, userController.getUser);

module.exports = router;
