const UserSchema = require('../models/user.model');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async function(req, res) {
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
        let result = await userNew.save();
        if(result) {
            return res.status(201).send({user : userNew, message: "User created!"})
        } else {
            throw "Could not create user!";
        }        
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }

}

const login = async function(req, res) {
    let {email, password} = req.body;
    if(!email || !password) return res.sendStatus(400);
    try {
        email = email.toLowerCase();
        let user = await UserSchema.findOne({email}).exec();
        if(user){
            if(!bcryptjs.compareSync(password, user.password)) res.sendStatus(401);
            else {
                const token = jwt.sign({id: user._id},process.env.TOKEN_SECRET);
                res.json({token})
            }
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send({errorMessage: error.stack})
    }
}

const getUser = async function(req, res) {
    let id = jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET).id;
    if(!id) return res.status(400).send({ error: true, message: "Missing id user!"});
    try {
        let userFound = await UserSchema.findById(id);
        console.log(userFound);
        if(!userFound) return res.status(404).send({ error : true, message: "User not found!"});
        return res.status(200).send({ user: userFound, message : "User found succesfully!"});
    } catch (error) {
        return res.status(500).send({errorMessage: error})
    }
}


module.exports = {
    createUser,
    login,
    getUser
}