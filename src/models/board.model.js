const mongoose = require('mongoose');

let boardSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true 
    },
    idBoard: {
        type: String,
        required: true
    }
});

let Board = mongoose.model("board", boardSchema);

module.exports = Board;