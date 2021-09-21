//Requires
const { request, response } = require('express');
const { generateJWT } = require('../helpers/jwt-generator');
const User = require('./../models/User');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        
        //Verifica si el email existe
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({msg: 'El email no coincide'});
        
        //Verifica si el usuario esta activo
        if(!userFound.state) return res.status(400).json({msg: 'El usuario no esta activo'});

        //Verifica la contraseña
        const passwordMatch = await User.comparePassword(password, userFound.password);
        if(!passwordMatch) return res.status(400).json({msg: 'Contraseña incorrecta'});

        //Genera un JWT
        const token = await generateJWT(userFound._id);

        res.json({userFound, token});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { login }