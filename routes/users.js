
const router = require('express').Router();
const {getUsers, putUsers, postUsers, deleteUsers} = require('./../controllers/users');

router.get('/', getUsers)
router.put('/:id', putUsers)
router.post('/', postUsers)
router.delete('/:id', deleteUsers)

module.exports = router;

