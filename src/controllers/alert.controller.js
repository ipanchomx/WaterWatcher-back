const alertSchema = require('../models/alert.model');
const jwt = require("jsonwebtoken");

const createAlert = async (req, res) => {
    let { idBoard, name, type, range, limit, periodQuantity, periodType, contactChannel } = req.body;
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    
    if(!idUser || !idBoard || !name || !type || !limit) return res.status(400).send({error: true, message: 'Missing required fields!'});
    
    try {

        let newAlert = alertSchema({
            idUser,
            idBoard,
            name,
            type,                       // VOLUME / SCHEDULE    
            range: range ? range : {},  // range -> { start : "", end : ""}
            limit,
            periodQuantity: periodQuantity ? periodQuantity : "",
            periodType: periodType ? periodType : "",
            contactChannel: contactChannel ? contactChannel : {},  // contactChannel -> { type : "{TELEPHONE / DISCORD}", contact : " 1234567890 / @testUser"}
        });

        let result = await newAlert.save();

        if(result) {
            return res.status(201).send({ alert: newAlert, message: "Data created succesfully!" });
        } else {
            throw "Could not create alert!";
        }   
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

const getUserAlerts = async (req, res) => {
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    if(!idUser) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        let userAlerts = await alertSchema.find({ idUser });
        console.log(userAlerts)
        return res.status(200).send({ alerts: userAlerts, size: userAlerts.length, message: "Alerts found succesfully!"});
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

const deleteUserAlertById = async (req, res) => {
    let idAlert = req.params.idAlert;

    if(!idAlert) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        let result = await alertSchema.findByIdAndDelete(idAlert);
        if(result)  return res.status(200).send({ alert: result, message: "Alert deleted succesfully!"});
        else throw "User Alert not found!"
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

const updateUserAlertVolumeById = async (req, res) => {
    let { idAlert, periodQuantity, periodType, limit, contactChannel } = req.body;

    if(!idAlert || !periodQuantity || !periodType || !limit || !contactChannel) return res.status(400).send({error: true, message: 'Missing required fields!'});

    console.log(req.body)
    try {
        let result = await alertSchema.findByIdAndUpdate(idAlert, { periodQuantity, periodType, limit, contactChannel }, { new : true })

        if(result)  return res.status(200).send({ alert: result, message : "Alert updated succesfully!"});
        else throw "Alert could not update succesfully!"
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

const updateUserAlertScheduleById = async (req, res) => {
    let { idAlert, range, limit, contactChannel } = req.body;

    if(!idAlert || !range || !limit || !contactChannel) return res.status(400).send({error: true, message: 'Missing required fields!'});

    console.log(req.body)
    try {
        let result = await alertSchema.findByIdAndUpdate(idAlert, { range, limit, contactChannel }, { new : true })

        if(result)  return res.status(200).send({ alert: result, message : "Alert updated succesfully!"});
        else throw "Alert could not update succesfully!"
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

module.exports = {
    createAlert,
    getUserAlerts,
    deleteUserAlertById,
    updateUserAlertVolumeById,
    updateUserAlertScheduleById
}