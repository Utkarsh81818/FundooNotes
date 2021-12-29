const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
chai.use(chaiHttp);
const labelDbs = require('./label.json');
const { expect } = require('chai');
chai.should();

describe('Add label by id api ', () => {
    it.only('AddLabelById_by_checking_server', (done) => {
        chai
            .request(server)
            .post('/addlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it.only('Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('Should Give false when token is not verify', (done) => {
        const token = labelDbs.label.invalidToken
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it.only('If payload of data is validated then it should give true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/:id')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it.only('When service layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61bb7ccb5aa989f5b63a3bc9')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it.only('When model layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/addlabel/61bb7ccb5aa989f5b63a3bc9')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
});