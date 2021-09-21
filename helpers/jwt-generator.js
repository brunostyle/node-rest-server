const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    return new Promise((resolve, reject) => {
        token = jwt.sign({uid}, process.env.SECRET_WORD, {
            expiresIn: '4h'
        }, ( err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        });
    });
}

module.exports = { generateJWT }