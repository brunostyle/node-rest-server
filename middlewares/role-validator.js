const { response, request } = require("express");


const isAdminRole = (req = request, res = response, next) => {

    if(!req.userAuth) return res.status(500).json({msg: 'Se quiere verificar el role si validar el token'});

    const {name, role} = req.userAuth;

    if(role !== 'ADMIN_ROLE') return res.status(401).json({msg: `${name} no tiene permisos de administrador`});
    next();
}

const hasRole = ( ...roles) => {

    return (req, res, next) => {
        if(!req.userAuth) return res.status(500).json({msg: 'Se quiere verificar el role si validar el token'});
    
        if(!roles.includes(req.userAuth.role)) return res.status(401).json({msg: `El servicio requiere de uno de estos roles: ${roles}`});
        next()
    }
}

module.exports = { isAdminRole, hasRole };