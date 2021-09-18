const {request, response} = require('express');

const getUsers = (req = request, res = response) => {
    res.json({
        message: 'GET api'
    });
}

const putUsers = (req = request, res = response) => {
    res.json({
        message: 'PUT api'
    });
}

const postUsers = (req = request, res = response) => {
    res.status(201).json({
        message: 'POST api'
    });
}

const deleteUsers = (req = request, res = response) => {
    res.json({
        message: 'DELETE api'
    });
}

module.exports = {getUsers, putUsers, postUsers, deleteUsers}