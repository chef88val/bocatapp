//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Bocata = require('../models/bocata');
var request = require('supertest')
//Require the dev-dependencies
let chai = require('chai');
let expect = require('chai').expect;
let chaiHttp = require('chai-http');
//let server = require('../index');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
const url= 'http://localhost:3800/api/';
const reqq= request('http://localhost:3800/api/');
let idMongo ;
let idMongoReal='5b3f93135dd0ba50f255fee5' ;
describe ('Model.RSS', ()=>{
    it('Exist',(done)=>{
        let el = new Bocata({title:'title', visible:true, publisher:'pais'});
        console.log(el);
        idMongo =el._id;
        el.validate(((err,bocata)=>{
            //expect(err.errors.title).to.exist;
            done();
        }));
    })

    it('ExistFalse',(done)=>{
        let el = new Bocata({title:'title', visible:false, publisher:'pais'});
        console.log(el);
        el.validate(((err,bocata)=>{
            //expect(err.errors.title).to.exist;
            done();
        }));
    })
});
describe('Bocata',()=>{
    it('Exist', (done)=>{
        done();
    })
    it('List', (done)=>{
        chai.request(url).get('bocatas')
        .end(((err,res)=>{
            expect(res.body).to.have.property('bocatas').to.be.an('array')
            expect(res.body).to.have.property('itemspage');
            expect(res.body).to.have.property('pages');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        }));
    })

    it('one', (done)=>{
        chai.request(url).get(`bocata/${idMongoReal}`)
        .end(((err,res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        }));
    })
    it('NOone', (done)=>{
        chai.request(url).get('bocata/'+idMongo)
        .end(((err,res)=>{
            expect(res.body).to.be.an('object');
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            done();
        }));
    })

    it('Put', (done)=>{
        chai.request(url).put(`bocata/${idMongoReal}`)
        .end(((err,res)=>{
            expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Bocata updated');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        }));
    })

    it('Delete', (done)=>{
        chai.request(url).del(`bocata/${idMongoReal}`)
        .end(((err,res)=>{
            expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Bocata deleted');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        }));
    })
    it('afterDelete', (done)=>{
        chai.request(url).get(`bocata/${idMongoReal}`)
        .end(((err,res)=>{
            expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('El bocata no existe');
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            done();
        }));
    })
    it('Bocata_undo_delete', (done)=>{
        chai.request(url).put(`bocata_undo_delete/${idMongoReal}`)
        .end(((err,res)=>{
            expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Bocata updated');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        }));
    })
    it('afterUndoDelete', (done)=>{
        chai.request(url).get(`bocata/${idMongoReal}`)
        .end(((err,res)=>{
            expect(res.body).to.be.an('object').to.have.property('visible').to.be.true;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
        }));
    })
});