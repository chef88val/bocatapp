'use strict';

var express = require('express');
var bocataController = require('../controllers/bocata') 
var api = express.Router();

var middle= require('../middlewares/auth') 

api.get('/',middle.ensureAuth, bocataController.getBocata)
api.get('/:id',middle.ensureAuth, bocataController.getBocata)
api.post('/bocata', bocataController.updateBocata)
api.delete('/:id',middle.ensureAuth, bocataController.deleteBocata)
api.put('/:id',middle.ensureAuth, bocataController.updateBocata) 
module.exports = api