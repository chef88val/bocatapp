 var fs = require('fs');
 var User = require('../models/user')
 var Pedido = require('../models/pedido')
 var dataAdmin = require('../dataAdmin');
var utils = require('../utils')

 function getPassword(req, res, next) {
     if (req.params.password) {
         var auth = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
         if (!auth.passwordAdmin) return res.status(500).send({
             message: 'Error en la peticion'
         })
         if (req.params.password == auth.passwordAdmin)
             return res.status(200).send({
                 access: true
             })
         else
             return res.status(404).send({
                 access: false
             })
     }
     next();
 }

 function getData(req, res) {


     return res.status(200).send({
         profilesAPI: dataAdmin.profilesAPI,
         rolesAPI: dataAdmin.rolesAPI
     })
 }


 
 

 module.exports = { 
     getData,
     getPassword
 };