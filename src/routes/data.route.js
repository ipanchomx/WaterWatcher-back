const express = require("express");
const dataController = require('../controllers/data.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const notificationMiddleware = require("../middlewares/notification.middleware");

const router = express.Router();

router.get("/",authMiddleware, dataController.getTodayData)

router.post("/",notificationMiddleware, dataController.createData)

router.get("/range", authMiddleware, dataController.getDataInRange)
router.post("/createTestData", authMiddleware, dataController.createTestData)
router.get("/lastData", authMiddleware, dataController.getLastDataByBoard)

module.exports = router;