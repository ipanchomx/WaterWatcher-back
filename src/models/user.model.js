const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true     
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
    },
    discordUser: {
        type: String
    }
});

let User = mongoose.model("user", userSchema);

module.exports = User;
