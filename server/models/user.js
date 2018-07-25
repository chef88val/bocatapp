'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    email: String,
    money: Number,
    visible: Boolean
})


module.exports = mongoose.model('USER', userSchema)