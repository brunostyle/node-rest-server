//Requires
const router = require('express').Router();
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/validate-fields');
const { getUsers, putUsers, postUsers, deleteUsers } = require('./../controllers/users');
const { isRoleValid, emailExist, userByIdExist } = require('../helpers/db-validators');

//Route getUsers
router.get('/', [
    check('limit', 'El limite debe ser un numero').isNumeric(),
    check('from', 'El from debe ser un numero').isNumeric(),
    validateFields
], getUsers)

//Route putUsers
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userByIdExist),
    check('role').custom(isRoleValid),
    validateFields
], putUsers)

//Route postUsers
router.post('/', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(), 
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'la contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    check('role').custom(isRoleValid),
    validateFields
], postUsers)

//Route postUsers
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userByIdExist),
    validateFields
],deleteUsers)

module.exports = router;

