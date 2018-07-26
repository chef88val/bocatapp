var moment = require('moment')

function stringToBoolean(val) {
    console.log(isNaN(val) + typeof val)
    try {
        if (isNaN(val))
            return val == 'true' || 1;
        else
            return parseInt(val) == 1;
    } catch (error) {}
}

function returnMomentFormat() {
    return moment().format("DD/MM/YYYY");
}

function makeMigration(type) {
    var db = require('mongoose'); 
    if (type == 'user') {
        let model = require('./models/user'); 
         
        
        model.updateMany({ }, {$set: {
            profile:'SF', role:'User', notify:true
        }});
        }
}
module.exports = {
    stringToBoolean,
    returnMomentFormat,
    makeMigration
}