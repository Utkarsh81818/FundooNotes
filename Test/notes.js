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
    it.only('givenCreateNotes_validToken_shouldNotbeCreated', (done) => {
      const token = noteDB.notes.validToken;
      chai
        .request(server)
        .post('/createnotes')
        .set({ authorization: token })
        .send(token)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it.only('givenCreateNotes_inValidToken_shouldNotbeCreated', (done) => {
        const token = noteDB.notes.validToken;
        chai
          .request(server)
          .post('/createnotes')
          .set({ authorization: token })
          .send(token)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
});