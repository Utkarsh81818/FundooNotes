const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const helper = require('../App/utilities/helper');
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

// get note test cases
describe('get notes api', () => {
    it('notes', (done) => {
      const token = noteDB.notes.getNoteWithValidToken;
      chai
        .request(server)
        .get('/getnotes')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  
    it('givenCreateNotes_whenInvalidToken_shouldNotbeGet', (done) => {
      const token = noteDB.notes.getNoteWithInValidToken;
      chai
        .request(server)
        .get('/getnotes')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('get notes api by id ', () => {
    it('get notes by id when ids not match with token id  ', (done) => {
      const decodeToken = helper.validateToken;
      const id = decodeToken.dataForToken.id;
      const resultOFFind = notes.findById(id);
      chai
        .request(server)
        .get('/getnotes')
        .send(resultOFFind)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

 it('get notes by id when  ids match with token id ', (done) => {
        const id = noteDB.notes.validToken.id;
        const resultOFFind = notes.findById(id);
        chai
          .request(server)
          .get('/getnotes')
          .send(resultOFFind)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });