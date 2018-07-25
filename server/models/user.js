'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var feedSchema =  Schema({
    name: String,
    email: String,
    money: Number,
    visible: Boolean
})


module.exports = mongoose.model('FEED', feedSchema)