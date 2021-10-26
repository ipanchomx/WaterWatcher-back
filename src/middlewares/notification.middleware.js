const alertSchema = require('../models/alert.model');
const jwt = require("jsonwebtoken");

let notificationMiddleware = function (req, res, next) {
    let idBoard = req.headers.idboard
    let { flow, volume } = req.body;
    if (!idBoard) return res.status(400).send({ error: true, message: 'Missing required header!' });
    let now = new Date();
    try {
        let userAlerts = await alertSchema.find({ idBoard });
        userAlerts.forEach(alert => {
            switch (alert.type) {
                case 'schedule':
                    let alertStartHour = (alert.range.start.hour + 5) % 24; // +5 to convert to UTC
                    let alertStartMinute = alert.range.start.minute;
                    let alertEndHour = (alert.range.end.hour + 5) % 24; // +5 to convert to UTC
                    let alertEndMinute = alert.range.end.minute;

                    if (volume >= alert.limit && now.getUTCHours() >= alertStartHour && now.getUTCHours() < alertEndHour && now.getUTCMinutes() >= alertStartMinute && now.getUTCMinutes() < alertEndMinute) {
                        // send notification
                        
                    }
                    break;

                case 'volume':

                    break;

                case 'time':

                    break;

                default:
                    break;
            }
        });
    } catch (error) {
        return res.status(500).send({ errorMessage: error })
    }
}
module.exports = notificationMiddleware