'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bocataSchema =  Schema({
    name: String,
    visible: {type:Boolean, default:true}
})


module.exports = mongoose.model('BOCATA', bocataSchema)