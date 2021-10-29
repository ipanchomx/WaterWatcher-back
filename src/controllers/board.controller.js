const boardSchema = require('../models/board.model');
const jwt = require("jsonwebtoken");

const createBoard = async (req, res) => {
    let { idBoard, name } = req.body;
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    
    if(!idUser || !idBoard || !name) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        let newBoard = boardSchema({
            idUser,
            idBoard,
            name
        });

        let result = await newBoard.save();

        if(result) {
            return res.status(201).send({ data: newBoard, message: "Board created succesfully!" });
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
        return res.status(200).send({ data: result, message: "Board retrieved succesfully!" });
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }
}

module.exports = {
    createBoard,
    getBoardsByidUser
}