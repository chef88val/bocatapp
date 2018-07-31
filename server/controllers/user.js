var User = require('../models/user')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');
var moment = require('moment')


function getUser(req, res, next) {
    if (req.params.id) {
        try {
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

        } catch (error) {

        }
    }
}

function getUsers(profile) {

    try {


        var results = User.find({
            visible: true,
            notify: true,
            profile,
            role: 'User'
            /*$and:[
                {$or:[{lastCall:{ $exists: false }}]}, 
                {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
            ]*/
        });
        //console.log('-'+ users) 
        return results;


    } catch (error) {

    }

}


function getLoginUser(req, res, next) {
    
        var user = new User({
            visible: true, 
            profile: req.body.profile,
            email: req.body.email
        })
          console.log('body',req.body)
          console.log('user',user)
         User.find(
            {
                visible: true, 
                profile: req.body.profile,
                email: req.body.email
            }
            /*$and:[
                {$or:[{lastCall:{ $exists: false }}]}, 
                {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
            ]*/
        ,{}).exec((err, _user) => {
        //console.log(err,'-',_user) 

        if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_user) return res.status(404).send({
                message: 'No hay Users disponibles'
            })
            //if (_user) 
            return res.status(200).send(
                _user[0]
            )
    })


     

}


function saveUser(user) {
     var res;
     let _user = new User(user);
    try {
        console.log('1',user)
        console.log('11',_user)
        User.create(_user,{new:true}, (err, __user) => {
            console.log('2',__user)
            console.log('3',err)
res = __user;
          /*  if (err) return err
            if (!_user) return null
            return _user*/

        })
    } catch (error) {
        return error
    }
    console.log('res',res)

}

function updateCallerUser(req, res, next) {
var user = req.body;
var id= req.params.id
    try {
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
    } catch (error) {

    }
    next();
}


function updateUser(req, res, next) {

    if (req.params.id) {
        try {
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
        } catch (error) {

        }
    } else {
        console.log('0' + req.body)
        console.log('1' + User);
        let user = new User(req.body);
        try {
            User.create(user, (err, _user) => {

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
    next();
}

function deleteUser(req, res, next) {
    User.findByIdAndUpdate(req.params.id,{visible: false}, (err, _user) => {
        if (err) return res.status(500).send({
            message: 'Error en la peticion'
        })
        if (!_user) return res.status(404).send({
            message: 'No hay Feeds disponible'
        })
        return res.status(200).send({
            message: "Feed deleted"
        })
    })

}


function updateKeyUser(req, res, next) {
    var key= req.params.key
    var user ={}
       user[key]= utils.valueToBoolean(req.params.value);
   try {
       User.findByIdAndUpdate(req.params.id,  user, (err, _user) => {
           console.log(_user,'updateUser', err)
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
   } catch (error) {

   }
   //next();
}


module.exports = {
    getUser,
    getUsers,
    saveUser,
    updateCallerUser,
    deleteUser,
    updateUser,
    getLoginUser,
    updateKeyUser
};