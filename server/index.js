'use strict';

var mongoose =  require('mongoose');
var app = require('./app')
var port = 3800;
var nameApp = 'BocatApp'; 
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${nameApp}`, { useNewUrlParser: true })
    .then(
        ()=>{
            console.log(`Conexion a Base de datos ${nameApp} OK`)
            //Creando servidor
                app.listen(port,()=>{
                    console.log("Corriendo")
                })
        }
    ).catch(err=>console.log('err',err))

  