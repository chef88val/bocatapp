var pedido = require('../models/pedido')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');


function getPedido(req, res, next){
    res.status(200).send({
        message: "getPedido OK"
    })
}

function savePedido(req, res, next) { 
    res.status(200).send({
        message: "savePedido OK"
    })
}

function updatePedido(req, res, next){
    res.status(200).send({
        message: "updatePedido OK"
    })
}

function deletePedido(req, res, next) { 
    res.status(200).send({
        message: "deletePedido OK"
    })
}

module.exports = {
    getPedido,
    savePedido,
    deletePedido,
    updatePedido
};