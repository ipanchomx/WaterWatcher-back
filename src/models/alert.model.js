const mongoose = require('mongoose');

let alertSchema = mongoose.userSchema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
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
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    limit: {
        type: Number,
        required: true
    },
    periodQuantity: {
        type: Number,
    },
    periodType: {
        type: String,
    },
    contactChannel: {
        type: String,
    },
});

let Alert = mongoose.model("alert", alertSchema);

module.exports = Alert;