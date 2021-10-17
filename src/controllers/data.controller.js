const dataSchema = require('../models/data.model');
const jwt = require("jsonwebtoken");

const getTodayData = async (req, res) => {
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;

    if(!idUser) return res.status(400).send({ error: true, message: "Missing id user!"});
    
    let dateTemp = new Date();
    let dateToday = new Date(`${dateTemp.getFullYear()}-${dateTemp.getMonth() + 1}-${dateTemp.getDate()}`).getTime();


    try {
        let data = await dataSchema.find({ idUser, timestamp : { $gte : dateToday } });
        
        return res.status(200).send({data, message: "Data found succesfully!"});
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }
    
}

const getDataInRange = async (req, res) => {
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;

    if(!idUser) return res.status(400).send({ error: true, message: "Missing id user!"});

    let {start, end} = req.query;
    
    let startDate = new Date(start).getTime();
    let endDate = new Date(end).getTime();

    try {
        let data = await dataSchema.find({ idUser, timestamp : { $gte : startDate, $lt: endDate } });
        
        return res.status(200).send({data, message: "Data found succesfully!", size: data.length});
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

const createTestData = async (req, res) => {
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    
    if(!idUser) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        let newData;
        for(let j=1;j<=30;j++){
            for(let i=0;i<24;i++){
                newData = dataSchema({
                    timestamp : new Date(`2021-09-${j<10?"0":""}${j}T${i<10?"0":""}${i}:00:00`),
                    idUser,
                    flow: i+1,
                    volume: Math.random()*100
                });
                console.log(`Registro, dia: ${j}, hora: ${i}`)
                await newData.save();
            }
        }
        return res.status(201).send({ data: newData, message: "Data created succesfully!" }); 
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

module.exports = {
    getTodayData,
    createData,
    getDataInRange,
    createTestData
}