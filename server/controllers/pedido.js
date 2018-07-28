var Pedido = require('../models/pedido')
var User = require('../models/user')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');
var moment = require('moment')
var utils = require('../utils')


function getPedido(req, res, next) {
    if (req.params.id) {
        try {
            Pedido.find({
                    _id: req.params.id,
                    visible: true,
                    title: utils.returnMomentFormat()

                })
                .populate('users.user')
                .populate('users.item')
                .populate('items.user')
                .populate('items.bocatas')
                .populate('items.item')
                .populate('items')
                .populate('caller')
                .exec((err, pedido) => {
                     
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

        } catch (error) {

        }
    }else{
        try {
            Pedido.findOne({
                    visible: true,
                    title: utils.returnMomentFormat()

                })
                .populate('users.user')
                .populate('users.item')
                .populate('items.user')
                .populate('items.bocatas')
                .populate('items.item')
                .populate('items')
                .populate('caller')
                .exec((err, pedido) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!pedido || pedido.length < 1)
                        return res.status(404).send({
                            message: 'El pedido no existe'
                        })
                    //if (pedido &&  pedido.length > 1)

                    return res.status(200).send(
                        pedido
                    )

                })

        } catch (error) {

        }
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


        })
        user.lastCall = moment().format()
        var update = user.lastCall
        //user = new User(user);
        User.findByIdAndUpdate(user._id, {
            $set: {
                lastCall: update
            }
        }, (err, _user) => {
        });


    } catch (error) {
        return error
        /*res.status(200).send({
                    message: error.errors.size.ValidatorError
                })*/
    }
    return pedidoOK
}

function updatePedido(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            Pedido.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        users: update
                    }
                },
                (err, _pedido) => {
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

        } catch (error) {

        }
    }
}
function updatePedidoBocatas(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            Pedido.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        items: update
                    }
                },
                (err, _pedido) => {
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

        } catch (error) {

        }
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
    updatePedido,
    updatePedidoBocatas
};