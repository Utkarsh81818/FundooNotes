const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const noteDB = require('./notes.json');
const { expect } = require('chai');
const { string } = require('joi');
chai.should();

describe('create notes api', () => {
    it('givenCreateNotes_validToken_shouldNotbeCreated', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence()
        };
        chai
            .request(server)
            .post('/createnotes')
            .set({ authorization: token })
            .send(createNotes)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('givenCreateNotes_whenInvalidToken_shouldNotbeCreated', (done) => {
        const token = noteDB.notes.invalidToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.sentence()
        };
        chai
            .request(server)
            .post('/createnotes')
            .set({ authorization: token })
            .send(createNotes)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});