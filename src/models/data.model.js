const mongoose = require('mongoose');

let dataSchema = mongoose.Schema({
    timestamp : {
        type: Number,
        required: true
    },
    idUser: {
        type: String,
        required: true 
    },
    flow: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    accVolume: {
        type: Number,
        required: true
    },
    idboard: {
        type: String,
        required: true
    }
});

let Data = mongoose.model("data", dataSchema);

module.exports = Data;