const User = require('../models/User');
const Role = require('./../models/Role');

const isRoleValid = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if(!roleExist){
        throw new Error('Role no registrado en la base de datos')
    }
}

const emailExist = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if(emailExist){
        throw new Error('El email ya esta registrado');
    }
}

const userByIdExist = async (id) => {
    const idExist = await User.findOne({_id: id});
    if(!idExist){
        throw new Error('El Id no existe');
    }
}

module.exports = { isRoleValid, emailExist, userByIdExist }