const { jwt_secret } = require('../helper/env');
const jwt = require('jsonwebtoken');
const { failed } = require('../helper/response');

module.exports = (req, res, next) => {
    try{
        const { token } = req.headers;
        const decode = jwt.verify(token, jwt_secret);

        req.APP_DATA = {
            tokenDecode: decode,
        }
        
        next();
    } catch(err){
        failed(res, err, 'failed', 'Invalid token');
    }
}