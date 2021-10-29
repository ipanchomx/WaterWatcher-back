const mongoose = require('mongoose');

let alertSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    idBoard: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    range : {
        type: mongoose.Schema.Types.Mixed
    },
    limit: {
        type: Number,
    },
    periodQuantity: {
        type: Number,
    },
    periodType: {
        type: String,
    },
    contactChannel: {
        type: mongoose.Schema.Types.Mixed
    },
    lastNotificationDate: {
        type: Number,
    },
});

let Alert = mongoose.model("alert", alertSchema);

module.exports = Alert;