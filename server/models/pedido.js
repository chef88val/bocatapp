'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var pedidoSchema = Schema({
    title: String,
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BOCATA'
        },
        size: {
            type: String,
            enum: ['p', 'g']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'
        }
    }],
    users: Array,
    author: {type:String, default:'system'},
    status: {type:String, default:'draft'},
    pubDate: Date,
    visible: {type:Boolean, default:true}
})


module.exports = mongoose.model('PEDIDO', pedidoSchema)