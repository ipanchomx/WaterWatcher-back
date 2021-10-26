const alertSchema = require('../models/alert.model');
const jwt = require("jsonwebtoken");

let notificationMiddleware = function (req, res, next) {
    let idUser = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    let {flow, volume} = req.body; 
    if(!idUser) return res.status(400).send({error: true, message: 'Missing required fields!'});
//RIFAS SI LEES ESTO: hola
//hace falta poner dististantas tarjetas en la base de datos
    try {
        let userAlerts = await alertSchema.find({ idUser });
        userAlerts.forEach(element => {
            switch (element.type) {
                case 'horario':
                    
                    break;

                case 'volumen':
                    
                    break;
                    
                case 'tiempo':
                    
                    break;
            
                default:
                    break;
            }
        });
    } catch (error) {
        return res.status(500).send({errorMessage: error})      
    }
}
module.exports = notificationMiddleware 