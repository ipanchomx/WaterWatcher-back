const express = require("express");
const alertController = require('../controllers/alert.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.route('/')
    .post(authMiddleware, alertController.createAlert);


module.exports = router;
