require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSign = (payload, secret, options) => new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
            reject(err);
        }
        resolve(token);
    });
});

const jwtVerify = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

const getJWT = (req) => {
    return req.headers['authorization']?.split(" ")[1];
}

module.exports = { jwtSign, jwtVerify, getJWT };