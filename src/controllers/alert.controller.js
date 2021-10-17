const alertSchema = require('../models/alert.model');
const jwt = require("jsonwebtoken");

const createAlert = async (req, res) => {
    let { name, type, start, end, limit, periodQuatity, periodType, contactChannel } = req.body;
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    
    if(!idUser || !name || !type || !limit) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {

        let newAlert = alertSchema({
            idUser,
            name,
            type,
            start: start?start:"",
            end: end?end:"",
            limit,
            periodQuatity: periodQuatity?periodQuatity:"",
            periodType: periodType?periodType:"",
            contactChannel: contactChannel?contactChannel:"",
        });

        await newAlert.save();

        if(newAlert) {
            return res.status(201).send({ alert: newAlert, message: "Data created succesfully!" });
        } else {
            throw "Could not create data!";
        }   
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

module.exports = {
    createAlert
}