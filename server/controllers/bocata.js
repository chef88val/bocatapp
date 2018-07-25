var bocata = require('../models/bocata')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');


function getBocata(req, res, next){
    res.status(200).send({
        message: "getBocata OK"
    })
}

function saveBocata(req, res, next) { 
    res.status(200).send({
        message: "saveBocata OK"
    })
}

function updateBocata(req, res, next){
    res.status(200).send({
        message: "updateBocata OK"
    })
}

function deleteBocata(req, res, next) { 
    res.status(200).send({
        message: "deleteBocata OK"
    })
}

module.exports = {
    getBocata,
    saveBocata,
    deleteBocata,
    updateBocata
};