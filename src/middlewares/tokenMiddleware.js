const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;

function tokenMiddleware(req,res,next) {
        const authHeader = req.headers['authorization']
        const token = authHeader
        
        if(token == null){
             return res.status(400).json(
                 {
                     information: "No incluye token",
                     status: 400
                }
            )
        }
        jwt.verify(token, JWT_TOKEN,(err,user) =>{
            if(err){
                return res.status(403).json(
                    {
                        information: "Token inválido",
                        status: 403
                   }
               )
            }
            req.usuarioToken = user
            next();
        })
}

module.exports = tokenMiddleware;