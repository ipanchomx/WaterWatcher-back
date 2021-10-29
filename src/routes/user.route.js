const express = require("express");
const userController = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/signup', userController.createUser);

router.post("/login", userController.login);

router.get('/user', authMiddleware, userController.getUser);
router.put('/user', authMiddleware, userController.updateUser);

module.exports = router;
