let chai = require('chai');
let expect = require('chai').expect;
let utils = require('..utils/')

describe('stringToBoolean', () => {
    it('ok', () => {
        expect(utils.stringToBoolean('true')).to.be.true;
        expect(utils.stringToBoolean('false')).to.be.false;
        expect(utils.stringToBoolean('1')).to.be.null;
    })
})

describe('numberToBoolean', () => {
    it('ok', () => {
        expect(utils.numberToBoolean('true')).to.be.null;
        expect(utils.numberToBoolean('0')).to.be.false;
        expect(utils.numberToBoolean('1')).to.be.true;
    })
})

describe('returnMomentFormat', () => {
    it('ok', () => {
        expect(utils.returnMomentFormat().to.be.equal('01/08/2018'));
        expect(utils.returnMomentFormat().to.not.be.equal('02/08/2018'));
    })
})

describe('getIPAddress', () => {
    it('ok', () => {
        expect(utils.getIPAddress().to.be.equal('192.168.1.20'));
        expect(utils.getIPAddress().to.not.be.equal('192.168.1.30'));
    })
})
