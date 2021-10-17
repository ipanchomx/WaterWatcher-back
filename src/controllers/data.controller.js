const dataSchema = require('../models/data.model');
const jwt = require("jsonwebtoken");

const getTodayData = async (req, res) => {
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;

    console.log(idUser)
    if(!idUser) return res.status(400).send({ error: true, message: "Missing id user!"});
    
    let dateTemp = new Date();
    let dateToday = new Date(`${dateTemp.getFullYear()}-${dateTemp.getMonth() + 1}-${dateTemp.getDate()}`).getTime();


    try {
        let data = await dataSchema.find({ idUser, timestamp : { $gte : dateToday } });
        
        console.log(data);
        return res.status(200).send({data, message: "Data found succesfully!"});
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }
    
}


const createData = async (req, res) => {
    let { flow, volume } = req.body;
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    
    if(!idUser || !flow || !volume) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        let newData = dataSchema({
            timestamp : Date.now(),
            idUser,
            flow,
            volume
        });

        await newData.save();

        if(newData) {
            return res.status(201).send({ data: newData, message: "Data created succesfully!" });
        } else {
            throw "Could not create data!";
        }   
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

module.exports = {
    getTodayData,
    createData
}