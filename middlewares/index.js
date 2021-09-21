const validateFields = require('./field-validator');
const validateJWT = require('./jwt-validator');
const validateRoles = require('./role-validator');

module.exports = { ...validateFields, ...validateJWT, ...validateRoles}