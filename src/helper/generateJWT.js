const jwt = require('jsonwebtoken');
const { jwt_secret } = require('./env');

module.exports = async(payload) => {
    const token = await jwt.sign(payload, jwt_secret);
    return token;
}

