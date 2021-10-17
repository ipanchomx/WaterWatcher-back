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
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    }
});

let Data = mongoose.model("data", dataSchema);

module.exports = Data;