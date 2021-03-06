'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var pedidoSchema = Schema({
    title: String,
    users: [{
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
    items: [{type:mongoose.Schema.Types.ObjectId, ref: 'BOCATA'}],
    author: {type:String, default:'system'},
    status: {type:String, default:'draft'},
    caller: {type:mongoose.Schema.Types.ObjectId, ref: 'USER'},
    pubDate: Date,
    visible: {type:Boolean, default:true}
})


module.exports = mongoose.model('PEDIDO', pedidoSchema)