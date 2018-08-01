var Bocata = require('../models/bocata')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');


function getBocata(req, res, next) {
    if (req.params.id) {
        try {
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
        } catch (error) {
            return res.status(200).send({
                message: error.errors.size.ValidatorError
            })
        }
    } else {
        console.log('2')
        try {
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
        } catch (error) {
            return res.status(200).send({
                message: error.errors.size.ValidatorError
            })
        }
    }
}

function updateBocata(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            update.visible = true;
            Bocata.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _bocata) => {
                console.log('updateBocata', err)
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
        } catch (error) {
            return res.status(200).send({
                message: error.errors.size.ValidatorError
            })
        }
    } else {
        console.log('2');
        try {
            let bocata = new Bocata(req.body);
            Bocata.create(bocata, (err, _bocata) => {
                console.log(err, _bocata)
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
    try {
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
    } catch (error) {
        return res.status(200).send({
            message: error.errors.size.ValidatorError
        })
    }
}

module.exports = {
    getBocata,
    deleteBocata,
    updateBocata
};