const express = require('express');
const cors = require('cors');
const db = require('./config/db-connection');
const userRoutes = require('./src/routes/user.route');
const dataRoutes = require('./src/routes/data.route');
require('dotenv').config();


// if (process.env.NODE_ENV == 'dev') {
//     require('dotenv').config();
// }

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({message:'Welcome'}));

app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
    console.log("Server running on PORT " + PORT);
})

