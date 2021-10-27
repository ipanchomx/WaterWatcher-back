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
                    let nowDate = new Date(1999, 11, 1, now.getUTCHours(), now.getUTCMinutes(), 0);
                    let start = new Date(1999, 11, 1, alertStartHour, alertStartMinute, 0);
                    let end;
                    if(alertStartHour < alertEndHour) {
                        end = new Date(1999, 11, 1, alertEndHour, alertEndMinute, 0);
                    } else if (alertStartHour > alertEndHour) {
                        end = new Date(1999, 11, 2, alertEndHour, alertEndMinute, 0);
                    } else if (alertStartMinute < alertEndMinute) {
                        end = new Date(1999, 11, 1, alertEndHour, alertEndMinute, 0);
                    } else {
                        end = new Date(1999, 11, 2, alertEndHour, alertEndMinute, 0);
                    }

                    if(nowDate.getTime() < start.getTime()) {
                        nowDate.setDate(nowDate.getUTCDate() + 1);
                    }

                   if (volume >= alert.limit && (nowDate.getTime() > start.getTime()) && (nowDate.getTime() < end.getTime()) ) {  
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