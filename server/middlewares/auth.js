'use strict'
 

exports.ensureAuth = function (req, res, next) {
 
    req.user = true;
    next();

}