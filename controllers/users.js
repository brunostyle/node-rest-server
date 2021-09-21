//Requires
const { request, response } = require('express');
const User = require('../models/User');

//Controller getUsers 
const getUsers = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = {state: true};
    try {
        //Verifica si el limite y el from son numeros
        if(isNaN(limit)) return res.status(400).json({msg: 'El limite debe ser un valor numerico'});
        if(isNaN(from)) return res.status(400).json({msg: 'El from debe ser un valor numerico'});

        //PROMISE.ALL resuelve multiples promesas al mismo tiempo
        const [count, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .limit(Number(limit))
                .skip(Number(from))
        ]);

        //Le envia al cliente la cantidad de documentos y los usuarios
        res.json({count, users});
    } catch (error) {
        console.log(error);
    }
}

//Controller putUsers 
const putUsers = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...rest} = req.body;
    try {
        if(password){
            //Encripta la contraseña
            rest.password = await User.encryptPassword(password);
        }
        //Actualiza el usuario 
        const user = await User.findByIdAndUpdate(id, rest);

        //Le envia al cliente los datos antiguos
        res.json(user);   
    } catch (error) {
        console.log(error);
    }
}

//Controller postUsers
const postUsers = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    try {
        //Crea el modelo de el usuario
        const user = new User({name, email, password: await User.encryptPassword(password), role});

        //Guarda los datos en la base de datos
        await user.save();

        //Responde un estado exitoso al cliente
        res.status(201).json();
    } catch (error) {
        console.log(error);
    }
}

//Controller deleteUsers
const deleteUsers = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const userDelete = await User.findByIdAndUpdate(id, {state: false});
        res.json(userDelete);    
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers, putUsers, postUsers, deleteUsers }