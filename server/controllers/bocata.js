var Bocata = require('../models/bocata')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');


function getBocata(req, res, next) {
    if (req.params.id) {

        Bocata.findById({
            _id: req.params.id,
            visible: true
        }, (err, bocata) => {
            console.log(err, bocata)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!bocata || bocata.length < 1)
                return res.status(404).send({
                    message: 'El bocata no existe'
                })
            //if (bocata &&  bocata.length > 1)

            return res.status(200).send({
                bocata
            })

        })

    } else {
        console.log('2')
        Bocata.find({
                visible: true
            },
            (err, bocatas, total) => {
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!bocatas) return res.status(404).send({
                    message: 'No hay bocatas disponibles'
                })
                //if (bocatas)
                return res.status(200).send({
                    bocatas
                })

                //return res.status(200).send(bocatas)

            }
        )
    }

}

function updateBocata(req, res, next) {
    if (req.params.id) {
       var update = req.body;
       console.log('1',req.body)
        update.visible = true;
        Bocata.findByIdAndUpdate(req.params.id, update, {
            new: true
        }, (err, _bocata) => {
            console.log('updateBocata',err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_bocata) return res.status(404).send({
                message: 'No hay Bocatas disponibles'
            })
            //if (_bocata) 
            return res.status(200).send({
                message: "Bocata updated"
            })
        })
    } else {
        console.log('2');
        try {
            let bocata = new Bocata(req.body);
              Bocata.create(bocata,(err, _bocata) => {
            console.log(err,_bocata)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_bocata) return res.status(404).send({
                message: 'No hay Bocatas disponibles'
            })
            return res.status(200).send({
                message: "Bocata created"
            })
        })
        } catch (error) {
            return res.status(200).send({
                message: error.errors.size.ValidatorError
            })
        }
        
      
    }
}

function deleteBocata(req, res, next) {
    var bocataId = req.params.id;
    var update = req.body;
    Bocata.findByIdAndUpdate(bocataId, {
        visible: false
    }, (err, _bocata) => {
        if (err) return res.status(500).send({
            message: 'Error en la peticion'
        })
        if (!_bocata) return res.status(404).send({
            message: 'No hay Bocatas disponible'
        })
        return res.status(200).send({
            message: "Bocata deleted"
        })
    })
}

module.exports = {
    getBocata,
    deleteBocata,
    updateBocata
};