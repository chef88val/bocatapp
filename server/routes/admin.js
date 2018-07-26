'use strict';

var express = require('express');
var adminController = require('../controllers/admin')

var api = express.Router();

var middle= require('../middlewares/auth') 

api.get('/password/:password',middle.ensureAuth, adminController.getPassword) 

module.exports = api