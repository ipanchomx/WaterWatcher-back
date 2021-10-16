const UserSchema = require('../models/user.model');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

let login = async function(req, res) {
    let {email, password} = req.body;
    if(!email || !password) return res.sendStatus(400);
    try {
        email = email.toLowerCase();
        let user = await UserSchema.findOne({email}).exec();
        if(user){
            if(!bcrypt.compareSync(password, user.password)) res.sendStatus(401);
            else {
                const token = jwt.sign({email},process.env.TOKEN_SECRET);
                res.json({token})
            }
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }
}


module.exports = {
    createUser,
    login
}