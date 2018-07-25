'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bocataSchema =  Schema({
    name: String,
    size: {type: String, enum: ['p','g']},
    visible: Boolean
})


module.exports = mongoose.model('BOCATA', bocataSchema)