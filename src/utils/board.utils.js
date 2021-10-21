const boardSchema = require('../models/board.model');

const getBoardUser = async (idBoard) => {
    try {
        if(!idBoard) throw undefined;
        let board = await boardSchema.findOne({ idBoard });
        return board.idUser
    } catch (error) {
        return undefined
    }
}

module.exports = {getBoardUser}