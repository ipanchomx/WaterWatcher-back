const alertSchema = require('../models/alert.model');
const dataSchema = require('../models/data.model');

let notificationMiddleware = async function (req, res, next) {
    let idBoard = req.headers.idboard
    let { flow, volume } = req.body;
    if (!idBoard) return res.status(400).send({ error: true, message: 'Missing required header!' });
    let now = new Date();
    try {
        let userAlerts = await alertSchema.find({ idBoard });
        userAlerts.forEach(async alert => {
            switch (alert.type) {
                case 'schedule':
                    let alertStartHour = (alert.range.start.hour + 5) % 24; // +5 to convert to UTC
                    let alertStartMinute = alert.range.start.minute;
                    let alertEndHour = (alert.range.end.hour + 5) % 24; // +5 to convert to UTC
                    let alertEndMinute = alert.range.end.minute;
                    let nowDate = new Date(1999, 11, 1, now.getUTCHours(), now.getUTCMinutes(), 0);
                    let start = new Date(1999, 11, 1, alertStartHour, alertStartMinute, 0);
                    let end;
                    if (alertStartHour < alertEndHour) {
                        end = new Date(1999, 11, 1, alertEndHour, alertEndMinute, 0);
                    } else if (alertStartHour > alertEndHour) {
                        end = new Date(1999, 11, 2, alertEndHour, alertEndMinute, 0);
                    } else if (alertStartMinute < alertEndMinute) {
                        end = new Date(1999, 11, 1, alertEndHour, alertEndMinute, 0);
                    } else {
                        end = new Date(1999, 11, 2, alertEndHour, alertEndMinute, 0);
                    }

                    if (nowDate.getTime() < start.getTime()) {
                        nowDate.setDate(nowDate.getUTCDate() + 1);
                    }

                    if (volume >= alert.limit && (nowDate.getTime() > start.getTime()) && (nowDate.getTime() < end.getTime())) {
                        // send notification    
                        console.log('send notification Schedule');
                    }

                    break;

                case 'volume':
                    let limit = alert.limit;
                    let periodQuantity = alert.periodQuantity;
                    let periodType = alert.periodType;
                    let periodTypeToMilliseconds;
                    switch (periodType) {
                        case 'days':
                            periodTypeToMilliseconds = 86400000;
                            break;
                        case 'weeks':
                            periodTypeToMilliseconds = 604800000;
                            break;
                        case 'months':
                            periodTypeToMilliseconds = 2592000000;
                            break;
                    }
                    let lastNotificationDate = alert.lastNotificationDate ? alert.lastNotificationDate : 0;
                    let notificationDelayOver = lastNotificationDate + (periodQuantity * periodTypeToMilliseconds) < now.getTime()
                    if (notificationDelayOver) {
                        let lastData = await dataSchema.findOne({ idBoard }).sort({ timestamp: -1 });
                        let totalVolume = lastData.accVolume + volume;
                        let periodTime = now.getTime() - (periodQuantity * periodTypeToMilliseconds);

                        let priorData = await dataSchema.findOne({ idBoard, timestamp: { $lte: periodTime }, accVolume: { $gte: 0 } }).sort({ timestamp: -1 });
                        let periodVolume = totalVolume - priorData.accVolume;
                        if (periodVolume >= limit) {
                            // send notification
                            await alertSchema.findByIdAndUpdate(alert._id, { lastNotificationDate: now.getTime() }, { new: true })
                            console.log('notification sent Volume');
                        }
                    }
                    break;

                case 'time':
                    let periodQuantity = alert.periodQuantity;
                    let periodType = alert.periodType;
                    let lastData = await dataSchema.findOne({ idBoard }).sort({ timestamp: -1 });
                    let lastNotificationDate = alert.lastNotificationDate ? alert.lastNotificationDate : 0;
                    let tenMinutes = 10*60*1000;
                    let notificationDelayOver = lastNotificationDate + (tenMinutes) < now.getTime();

                    if(notificationDelayOver) {
                        let continuityLimit = 0;
                        if(periodType == "hours") continuityLimit = periodQuantity * 60;
                        else continuityLimit = periodQuantity;
    
                        let continuityLastData = lastData.continuity;
    
                        if(continuityLastData >= continuityLimit) {
                            await alertSchema.findByIdAndUpdate(alert._id, { lastNotificationDate: now.getTime() }, { new: true })
                            console.log('notification sent time');
                        }
                    }
                    break;

                default:
                    break;
            }
        });
        next();
    } catch (error) {
        return res.status(500).send({ errorMessage: error })
    }
}
module.exports = notificationMiddleware