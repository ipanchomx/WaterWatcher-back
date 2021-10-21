const express = require("express");
const boardController = require('../controllers/board.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/",authMiddleware, boardController.createBoard)

module.exports = router;