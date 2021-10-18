const express = require("express");
const alertController = require('../controllers/alert.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.route('/')
    .post(authMiddleware, alertController.createAlert)
    .get(authMiddleware, alertController.getUserAlerts)

router.route('/:idAlert')
    .delete(authMiddleware, alertController.deleteUserAlertById)

router.put('/updateVolume', alertController.updateUserAlertVolumeById)

router.put('/updateSchedule', alertController.updateUserAlertScheduleById)

module.exports = router;
