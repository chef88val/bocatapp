'use strict';

var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var routes = require('./routes/api')
var fs = require('fs');
var utils = require('./utils')
var moment = require('moment')
var controllerPedido = require('./controllers/pedido');
var controllerUser = require('./controllers/user');
var _ = require('lodash')
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
var nodeoutlook = require('nodejs-nodemailer-outlook')
var caller;

function sendEmail(currentPedido) {
    var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
    try {
        console.log(caller, 'try', authEmail)
        nodeoutlook.sendEmail({
            auth: {
                user: authEmail.user,
                pass: authEmail.pass
            },
            from: 'jsegarrm@everis.com',
            to: listUsersToNotify,
            subject: `Pedido del dia ${utils.returnMomentFormat()}!`,
            html: `Para el dia de hoy ${utils.returnMomentFormat()}, el encargado de llamar será
            ${caller.name}, usa este <a href='http://${utils.getIPAddress()}'>enlace</a> para llamar.
            Para el resto, este es vuestro enlace para reservar.`,
            text: 'This is text version!'
        });
    } catch (error) {
        console.log(error)
    }

}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
console.log(typeof process.env.SEND_EMAIL + typeof utils.stringToBoolean(process.env.SEND_EMAIL) + utils.stringToBoolean(process.env.SEND_EMAIL) + typeof process.env.SEND_EMAIL)

var listUsers = [];
var listUsersToNotify = [];
utils.makeMigration('user');

function randomUser() {

    //console.log(listUsers)
    let numberRandom = Math.floor(Math.random() * (listUsers.length))

    console.log('2' + 'numberRandom' + numberRandom)
    console.log('3' + 'listUsers[numberRandom]' + listUsers[numberRandom])
}
setTimeout(() => {

    //randomUser();
    if (utils.stringToBoolean(process.env.SEND_EMAIL)) {

        console.log('111' + process.env.NODE_ENV, typeof process.env.SEND_EMAIL)
        sendEmail()

    }
}, 2000);
var currentPedido;

function initPedidoDay(profile) {
    let querylistUsers = controllerUser.getUsers(profile);
    querylistUsers.exec((err, users) => {
        if (users) {
            //listUsersToNotify = users;
            console.log('-' + users.length)
            users.forEach((user) => {
                if (!(listUsersToNotify.includes(user.email))) listUsersToNotify.push(user.email)
                if ((isNaN(user.lastCall) || user.lastCall != null) && !(moment(user.lastCall).isBetween(moment().subtract(7, 'days'), moment().format()))) {
                    listUsers.push(user)
                }
            })
        }
        console.log('listUsers' + listUsers.length)
        console.log('listUsersToNotify' + listUsersToNotify.length)


        let numberRandom = Math.floor(Math.random() * (listUsers.length))
        caller = listUsers[numberRandom]
        console.log(numberRandom, caller)
        console.log('-' + listUsersToNotify.length)
        if (utils.stringToBoolean(process.env.SAVE_PEDIDO))
            currentPedido = controllerPedido.savePedido(caller)
        /*.exec((err, pedido)=>{
            controllerUser.updateCallerUser(caller).exec((err, ok)=>{
                console.log(err, ok)
            });
        });*/
    });
}

const profilesAPI = ['SF'];

setTimeout(() => {
    profilesAPI.forEach((profile) => {
        initPedidoDay(profile)
    })


}, 1000);
var CronJob = require('cron').CronJob;
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
new CronJob('00 10 * * 0-5', function () {
    // Código a ejecutar

    initPedidoDay()
    //let idPedido = controllerPedido.savePedido();
}, function () {

    //let listUsers = controllerUser.getUsers();
    //let numberRandom = Math.random(1 + listUsers.length)
    // Código a ejecutar cuando la tarea termina. 
    // Puedes pasar null para que no haga nada
    if (utils.stringToBoolean(process.env.SEND_EMAIL)) {
        var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
        console.log('111' + process.env.NODE_ENV, typeof process.env.SEND_EMAIL)
        sendEmail()

    }
}, true);