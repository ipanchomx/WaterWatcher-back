const boardSchema = require('../models/board.model');
const jwt = require("jsonwebtoken");

const createBoard = async (req, res) => {
    let { idBoard } = req.body;
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    
    if(!idUser || !idBoard) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        let newBoard = boardSchema({
            idUser,
            idBoard
        });

        let result = await newBoard.save();

        if(result) {
            return res.status(201).send({ data: newBoard, message: "Data created succesfully!" });
        } else {
            throw "Could not create data!";
        }   
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}

const getBoardsByidUser = async (req, res) => {
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    if(!idUser) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        let result = await boardSchema.find({idUser});

        if(result.length > 0) {
            return res.status(200).send({ data: result, message: "Data retrieved succesfully!" });
        } else {
            throw "Could not retrieve data!";
        }
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }
}

module.exports = {
    createBoard,
    getBoardsByidUser
}