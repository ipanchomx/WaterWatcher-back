const jwt = require("jsonwebtoken");

let authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({error:true, message: "Missing authorization header"})

    try {
        if(jwt.verify(token, process.env.TOKEN_SECRET)) return next();
        else res.status(401).json({error:true, message: "Invalid token signature"})
    } catch (error) {
       res.status(401).json({
            error: true,
            message: "Invalid Token!"
        })
    }
}
module.exports = authMiddleware 