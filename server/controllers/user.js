var User = require('../models/user')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');


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

function saveUser(req, res, next) {
    res.status(200).send({
        message: "saveUser OK"
    })
}

function updateUser(req, res, next) {
    if (req.params.id) {
        var update = req.body;
        console.log('1',req.body)
         update.visible = true;
         User.findByIdAndUpdate(req.params.id, update, {
             new: true
         }, (err, _user) => {
             console.log('updateUser',err)
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
         console.log('2');
         User = new User(req.body);
         try {
               User.save((err, _user) => {
             console.log(err,_user)
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
             return res.status(200).send({
                 message: error.errors.size.ValidatorError
             })
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
    saveUser,
    deleteUser,
    updateUser
};