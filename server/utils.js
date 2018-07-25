
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
function returnMomentFormat(){
    return moment().format("DD/MM/YYYY");
}
module.exports = {
    stringToBoolean,returnMomentFormat
}