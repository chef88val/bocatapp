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
    var authEmail = JSON.parse(fs.readFileSync('./config.json','utf-8'))
    console.log('111'+process.env.NODE_ENV ,typeof process.env.SEND_EMAIL)
//sendEmail()

}
var listUsers=[];
function randomUser(){
     
     //console.log(listUsers)
    let numberRandom = Math.floor(Math.random()*(listUsers.length))
    
    console.log('2'+'numberRandom'+numberRandom)
    console.log('3'+'listUsers[numberRandom]'+listUsers[numberRandom])
}
setTimeout(() => {
    
    //randomUser();
}, 2000); 
    
setTimeout(() => {
    
    let querylistUsers= controllerUser.getUsers();
    querylistUsers.exec((err,users)=>{
        
        users.forEach((user)=>{
              
            if((isNaN(user.lastCall)|| user.lastCall!=null)&& !(moment(user.lastCall).isBetween(moment().subtract(7,'days'),moment().format()) )){
                listUsers.push(user)
            }
        })
         console.log('length'+listUsers.length)
        
         
        let numberRandom = Math.floor(Math.random()*(listUsers.length))
        let caller =listUsers[numberRandom]
         controllerPedido.savePedido(caller)/*.exec((err, pedido)=>{
            controllerUser.updateCallerUser(caller).exec((err, ok)=>{
                console.log(err, ok)
            });
        });*/
    });
    
}, 1000); 
var CronJob = require('cron').CronJob;
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
new CronJob('00 10 * * 0-5', function() {
  // Código a ejecutar

  let idPedido=controllerPedido.savePedido();
}, function() {

   let listUsers= controllerUser.getUsers();
   let numberRandom = Math.random(1+listUsers.length)
  // Código a ejecutar cuando la tarea termina. 
  // Puedes pasar null para que no haga nada
}, true);

utils.makeMigration('user');