'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bocataSchema =  Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    visible: {type:Boolean, default:true}
})


module.exports = mongoose.model('BOCATA', bocataSchema)