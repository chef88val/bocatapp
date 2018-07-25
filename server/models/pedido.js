'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var pedidoSchema =  Schema({
    items: Array,
    users: Array,
    author: String,
    status: String,
    pubDate: Date,
    visible: Boolean
})


module.exports = mongoose.model('PEDIDO', pedidoSchema)