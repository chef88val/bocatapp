'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    email: String,
    money: {type:Number, default:0},
    lastCall: Date,
    visible: {type:Boolean, default:true}
})


module.exports = mongoose.model('USER', userSchema)