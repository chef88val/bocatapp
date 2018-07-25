'use strict';

var mongoose =  require('mongoose');
var app = require('./app')
var port = 3800;
var nameApp = 'Avantio';
var feedController = require('./controllers/rss')
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${nameApp}`)
    .then(
        ()=>{
            console.log(`Conexion a Base de datos ${nameApp} OK`)
            //Creando servidor
                app.listen(port,()=>{
                    console.log("Corriendo")
                })
        }
    ).catch(err=>console.log('err',err))

  