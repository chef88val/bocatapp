var Pedido = require('../models/pedido')
var User = require('../models/user')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');
var moment = require('moment')
var utils = require('../utils')


function getPedido(req, res, next) {
    if (req.params.id) {

        Pedido.find({
                _id: req.params.id,
                visible: true,

            })
            .populate('items.user')
            .populate('items.item')
            .exec((err, pedido) => {
                console.log(err, pedido)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!pedido || pedido.length < 1)
                    return res.status(404).send({
                        message: 'El pedido no existe'
                    })
                //if (pedido &&  pedido.length > 1)

                return res.status(200).send({
                    pedido
                })

            })

    }
}

//function savePedido(req, res, next) {
function savePedido(user) {
    var pedidoOK;
    let pedido = new Pedido({
        title: utils.returnMomentFormat(),
        items: [],
        users: [],
        caller: user,
        author: 'system',
        status: 'draft',
        pubDate: moment(),
        visible: true
    });
    try {
         pedido.save((err, _pedido) => {
             console.log('_pedido'+_pedido)
             
            
        })
        user.lastCall = moment().format()
             var update = user.lastCall
             console.log(user);
            //user = new User(user);
            User.findByIdAndUpdate(user._id,{$set:{lastCall:update}}, (err,_user)=>{
                console.log('_user'+_user)
            });
        
         
    } catch (error) {
        return error/*res.status(200).send({
            message: error.errors.size.ValidatorError
        })*/
    }
return pedidoOK
}

function updatePedido(req, res, next) {
    if (req.params.id) {
        var update = req.body;
        console.log('1', req.body)
        Pedido.findByIdAndUpdate(req.params.id,
            //update, 
            {
                $push: {
                    items: update
                }
            },
            (err, _pedido) => {
                console.log('updatePedido', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_pedido) return res.status(404).send({
                    message: 'No hay Pedidos disponibles'
                })
                //if (_pedido) 
                return res.status(200).send({
                    message: "Pedido updated"
                })
            })
    }
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