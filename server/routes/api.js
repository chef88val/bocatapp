'use strict';

var express = require('express');
var bocataController = require('../controllers/bocata')
var pedidoController = require('../controllers/pedido')
var userController = require('../controllers/user')

var api = express.Router();

var middle= require('../middlewares/auth')

var multipart =  require('connect-multiparty')
var md_upload = multipart({uploadDir: './uploads/feeds'})

api.get('/bocata',middle.ensureAuth, bocataController.getBocata)
api.get('/bocata/:id',middle.ensureAuth, bocataController.getBocata)
api.post('/bocata', bocataController.saveBocata)
api.delete('/bocata/:id',middle.ensureAuth, bocataController.deleteBocata)
api.put('/bocata/:id',middle.ensureAuth, bocataController.updateBocata)

api.get('/pedido',middle.ensureAuth, pedidoController.getPedido)
api.get('/pedido/:id',middle.ensureAuth, pedidoController.getPedido)
api.post('/pedido', pedidoController.savePedido)
api.delete('/pedido/:id',middle.ensureAuth, pedidoController.deletePedido)
api.put('/pedido/:id',middle.ensureAuth, pedidoController.updatePedido)

api.get('/user',middle.ensureAuth, userController.getUser)
api.get('/user/:id',middle.ensureAuth, userController.getUser)
api.post('/user', userController.saveUser)
api.delete('/user/:id',middle.ensureAuth, userController.deleteUser)
api.put('/user/:id',middle.ensureAuth, userController.updateUser)

module.exports = api