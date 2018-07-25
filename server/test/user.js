//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');
var request = require('supertest')
//Require the dev-dependencies
let chai = require('chai');
let expect = require('chai').expect;
let chaiHttp = require('chai-http');
//let server = require('../index');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
const url = 'http://localhost:3800/api/';
const reqq = request('http://localhost:3800/api/');
let idMongo;
let idMongoReal = '5b3f93135dd0ba50f255fee5';
describe('Model.RSS', () => {
    it('Exist', (done) => {
        let el = new User({
            title: 'title',
            visible: true,
            publisher: 'pais'
        });
        console.log(el);
        idMongo = el._id;
        el.validate(((err, user) => {
            //expect(err.errors.title).to.exist;
            done();
        }));
    })

    it('ExistFalse', (done) => {
        let el = new User({
            title: 'title',
            visible: false,
            publisher: 'pais'
        });
        console.log(el);
        el.validate(((err, user) => {
            //expect(err.errors.title).to.exist;
            done();
        }));
    })
});
describe('User', () => {
    it('Exist', (done) => {
        done();
    })
    it('List', (done) => {
        chai.request(url).get('users')
            .end(((err, res) => {
                expect(res.body).to.have.property('users').to.be.an('array')
                expect(res.body).to.have.property('itemspage');
                expect(res.body).to.have.property('pages');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })

    it('one', (done) => {
        chai.request(url).get(`user/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('NOone', (done) => {
        chai.request(url).get('user/' + idMongo)
            .end(((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                done();
            }));
    })

    it('Put', (done) => {
        chai.request(url).put(`user/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('User updated');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })

    it('Delete', (done) => {
        chai.request(url).del(`user/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('User deleted');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('afterDelete', (done) => {
        chai.request(url).get(`user/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('El user no existe');
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                done();
            }));
    })
    it('User_undo_delete', (done) => {
        chai.request(url).put(`user_undo_delete/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('User updated');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('afterUndoDelete', (done) => {
        chai.request(url).get(`user/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('visible').to.be.true;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
});