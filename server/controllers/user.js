var User = require('../models/user')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');
var moment = require('moment')


function getUser(req, res, next) {
    if (req.params.id) {

        User.findById({
            _id: req.params.id,
            visible: true
        }, (err, user) => {
            console.log(err, user)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!user || user.length < 1)
                return res.status(404).send({
                    message: 'El user no existe'
                })
            //if (user &&  user.length > 1)

            return res.status(200).send({
                user
            })

        })

    }
}

function getUsers() {
    
    try {


        var results= User.find({
                visible: true
                //lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}
            });
            return results;
            
            console.log('-'+ users) 
             
        } catch (error) {
            
        }
    
}


function saveUser(req, res, next) {
    res.status(200).send({
        message: "saveUser OK"
    })
}

function updateCallerUser(user) {
    
     
    user.lastCall = moment().format();
        User.findByIdAndUpdate(id, user, {
            new: true
        }, (err, _user) => {
            console.log('updateUser', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_user) return res.status(404).send({
                message: 'No hay Users disponibles'
            })
            //if (_user) 
            return res.status(200).send({
                message: "User updated"
            })
        }) 
}
    
function updateUser(req, res, next) {
    
    if (req.params.id) {
        var update = req.body;
         
        update.visible = true;
        User.findByIdAndUpdate(req.params.id, update, {
            new: true
        }, (err, _user) => {
            console.log('updateUser', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_user) return res.status(404).send({
                message: 'No hay Users disponibles'
            })
            //if (_user) 
            return res.status(200).send({
                message: "User updated"
            })
        })
    } else {
        console.log('0'+req.body)
        console.log('1'+User);
        let user = new User(req.body);
        try {
            User.create(user,(err, _user) => {
                 
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_user) return res.status(404).send({
                    message: 'No hay Users disponibles'
                })
                return res.status(200).send({
                    message: "User created"
                })
                
            })
        } catch (error) {
            return res.status(500).send(error)
        }

 
    }
}

function deleteUser(req, res, next) {
    res.status(200).send({
        message: "deleteUser OK"
    })
}

module.exports = {
    getUser,
    getUsers,
    saveUser,updateCallerUser,
    deleteUser,
    updateUser
};