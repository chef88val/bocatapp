'use strict';

var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var routes = require('./routes/rss')
var feedController = require('./controllers/rss')
var _ = require('lodash');
let Parser = require('rss-parser');
let parser = new Parser();
module.exports = app;


global.fnError = function () {

    return {
        message: "No se ha podido identificar el usuario"
    }
}
global.fnPagination = (page) => {
    var page = 0;
    if (page) {
        page--;
    }
    var itemsPage = 50;
    return itemsPage * page
} 