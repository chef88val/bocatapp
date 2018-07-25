var user = require('../models/user')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');


function getUser(req, res, next) {
    res.status(200).send({
        message: "getUser OK"
    })
}

function saveUser(req, res, next) {
    res.status(200).send({
        message: "saveUser OK"
    })
}

function updateUser(req, res, next) {
    res.status(200).send({
        message: "updateUser OK"
    })
}

function deleteUser(req, res, next) {
    res.status(200).send({
        message: "deleteUser OK"
    })
}

module.exports = {
    getUser,
    saveUser,
    deleteUser,
    updateUser
};