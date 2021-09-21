const {request, response} = require('express')
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token) return res.status(400).json({msg: 'No haz enviado el token de acceso'});
    
    try {
        //Verifica si el token es valido 
        const { uid } = jwt.verify(token, process.env.SECRET_WORD)
        
        //Lee el usuario que corresponde al uid del token
        const user = await User.findById(uid);

        //Si el usuario no existe bloquea el acceso
        if(!user) return res.status(400).json({msg: 'El usuario no existe en la base de datos'});
        
        //Verifica si el usuario tiene estado activo
        if(!user.state) return res.status(400).json({msg: 'Token no valido'});

        //Crea una variable con los datos de el usuario autenticado
        req.userAuth = user;
        
        next();
    } catch (error) {
        //Si no lo es valido bloquea el acceso y tira un error
        console.log(error);
        res.status(401).json({msg: 'Token no valido'});
    }
}

module.exports = { validateJWT }