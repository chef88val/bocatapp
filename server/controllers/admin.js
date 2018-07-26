 var mongoosePaginate = require('mongoose-paginate');
 var path = require('path');
 var fs = require('fs');
 var moment = require('moment')


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
 }



 function getAdmin(req, res, next) {
     if (req.params.id) {

         Admin.findById({
             _id: req.params.id,
             visible: true
         }, (err, admin) => {
             console.log(err, admin)
             if (err) return res.status(500).send({
                 message: 'Error en la peticion'
             })
             if (!admin || admin.length < 1)
                 return res.status(404).send({
                     message: 'El admin no existe'
                 })
             //if (admin &&  admin.length > 1)

             return res.status(200).send({
                 admin
             })

         })

     }
 }

 function getAdmins(profile) {

     try {


         var results = Admin.find({
             visible: true,
             notify: true,
             profile,
             /*$and:[
                 {$or:[{lastCall:{ $exists: false }}]}, 
                 {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
             ]*/
         });
         //console.log('-'+ admins) 
         return results;


     } catch (error) {

     }

 }


 function saveAdmin(req, res, next) {
     res.status(200).send({
         message: "saveAdmin OK"
     })
 }

 function updateCallerAdmin(admin) {


     admin.lastCall = moment().format();
     Admin.findByIdAndUpdate(id, admin, {
         new: true
     }, (err, _admin) => {
         console.log('updateAdmin', err)
         if (err) return res.status(500).send({
             message: 'Error en la peticion'
         })
         if (!_admin) return res.status(404).send({
             message: 'No hay Admins disponibles'
         })
         //if (_admin) 
         return res.status(200).send({
             message: "Admin updated"
         })
     })
 }

 function updateAdmin(req, res, next) {

     if (req.params.id) {
         var update = req.body;

         update.visible = true;
         Admin.findByIdAndUpdate(req.params.id, update, {
             new: true
         }, (err, _admin) => {
             console.log('updateAdmin', err)
             if (err) return res.status(500).send({
                 message: 'Error en la peticion'
             })
             if (!_admin) return res.status(404).send({
                 message: 'No hay Admins disponibles'
             })
             //if (_admin) 
             return res.status(200).send({
                 message: "Admin updated"
             })
         })
     } else {
         console.log('0' + req.body)
         console.log('1' + Admin);
         let admin = new Admin(req.body);
         try {
             Admin.create(admin, (err, _admin) => {

                 if (err) return res.status(500).send({
                     message: 'Error en la peticion'
                 })
                 if (!_admin) return res.status(404).send({
                     message: 'No hay Admins disponibles'
                 })
                 return res.status(200).send({
                     message: "Admin created"
                 })

             })
         } catch (error) {
             return res.status(500).send(error)
         }


     }
 }

 function deleteAdmin(req, res, next) {
     res.status(200).send({
         message: "deleteAdmin OK"
     })
 }

 module.exports = {
     getAdmin,
     getAdmins,
     saveAdmin,
     updateCallerAdmin,
     deleteAdmin,
     updateAdmin,
     getPassword
 };