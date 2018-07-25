'use strict';

var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var routes = require('./routes/api')
var fs = require('fs');
module.exports = app;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', routes)
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
//console.log(this.cryptPassword('everis'))
var authEmail = JSON.parse(fs.readFileSync('./config.json','utf-8'))
var nodeoutlook = require('nodejs-nodemailer-outlook')

function sendEmail() {
    
    console.log(authEmail.user+authEmail.pass)
    nodeoutlook.sendEmail({
        auth: {
            user: authEmail.user,
            pass: authEmail.pass
        },

        from: 'jsegarrm@everis.com',
        to: 'jsm.multimedia@gmail.com',
        subject: 'Hey you, awesome!',
        html: '<b>This is bold text</b>',
        text: 'This is text version!'
    });
}
sendEmail()