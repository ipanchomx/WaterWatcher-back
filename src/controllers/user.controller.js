const UserSchema = require('../models/user.model');
const bcryptjs = require("bcryptjs");

let createUser = async function(req, res) {
    let {
        name,
        password,
        email,
        telephone
    } = req.body;

    if(!name || !password || !email || !telephone) return res.status(400).send({error: true, message: 'Missing required fields!'});

    try {
        email = email.toLowerCase();

        let hash = bcryptjs.hashSync(password, 10);
    
        let newUser = {
            name,
            password : hash,
            email,
            telephone
        }
    
        let userNew = UserSchema(newUser);
        await userNew.save();
        if(userNew) {
            return res.status(201).send({user : userNew, message: "User created!"})
        } else {
            throw "Could not create user!";
        }        
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }

}


module.exports = {
    createUser
}