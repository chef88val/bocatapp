'use strict';

var express = require('express');
var adminController = require('../controllers/admin')

var api = express.Router();

var middle= require('../middlewares/auth') 

api.get('/',middle.ensureAuth, adminController.getAdmin)
api.get('/:id',middle.ensureAuth, adminController.getAdmin)
api.post('/', adminController.updateAdmin)
api.delete('/:id',middle.ensureAuth, adminController.deleteAdmin)
api.put('/:id',middle.ensureAuth, adminController.updateAdmin)

module.exports = api