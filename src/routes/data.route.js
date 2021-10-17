const express = require("express");
const dataController = require('../controllers/data.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.route('/')
    .get(authMiddleware, dataController.getTodayData)
    .post(authMiddleware, dataController.createData)


module.exports = router;