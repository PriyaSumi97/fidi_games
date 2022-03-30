
const jwt = require('jsonwebtoken');

module.exports = {
    async verifyToken(req, res, next) {
        const apiKey = req.headers.token;
        if (!apiKey) return res.status(401).send({status:401, message:'unauthorized error'});
        try{
            const token = jwt.verify(apiKey, "FiD!G#Es$");
            req.user = token;
            next();
        }catch{
            res.status(400).send({status:400, messge:'Invalid Token'});
        }
    }
}