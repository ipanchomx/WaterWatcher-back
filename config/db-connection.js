const mongoose = require('mongoose');
require('dotenv').config();

// if (process.env.NODE_ENV == 'dev') {
//     require('dotenv').config();
// }

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(res => console.log("Connected to DB."))
    .catch(err => console.log(err));

module.exports = mongoose;