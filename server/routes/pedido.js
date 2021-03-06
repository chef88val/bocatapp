'use strict';

var express = require('express'); 
var pedidoController = require('../controllers/pedido') 

var api = express.Router();

var middle= require('../middlewares/auth') 
 
api.get('/',middle.ensureAuth, pedidoController.getPedido)
api.get('/:id',middle.ensureAuth, pedidoController.getPedido)
api.post('/', pedidoController.savePedido)
api.delete('/:id',middle.ensureAuth, pedidoController.deletePedido)
api.put('/:id',middle.ensureAuth, pedidoController.updatePedido)
api.put('/:id/bocatas',middle.ensureAuth, pedidoController.updatePedidoBocatas)
 
module.exports = api