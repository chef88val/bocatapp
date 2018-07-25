'use strict';

var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var routes = require('./routes/api')
var fs = require('fs');
var utils = require('./utils')
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
    
    try {
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
    } catch (error) {
        
    }
   
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
console.log(typeof process.env.SEND_EMAIL+typeof utils.stringToBoolean(process.env.SEND_EMAIL)+utils.stringToBoolean(process.env.SEND_EMAIL)+typeof process.env.SEND_EMAIL)
if(utils.stringToBoolean(process.env.SEND_EMAIL )){
    console.log('111'+process.env.NODE_ENV ,typeof process.env.SEND_EMAIL)
//sendEmail()

}