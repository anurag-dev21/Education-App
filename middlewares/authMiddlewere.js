const jwt = require('jsonwebtoken');
const VerifyToken = async(req,res,next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if(!token){
        return res.status(403).json({
            success:false,
            msg:'A token is required for authentication'
        })
    }
    try{
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        const decodedData = jwt.verify(bearerToken, 'secret_token');
        req.user = decodedData.user 
    }
    catch(error){
        return res.status(400).json({
            success:false,
            msg:'Invalid Token'
        })
    }
    return next();
}

module.exports = VerifyToken;