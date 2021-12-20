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

// get data by id
describe('Get notes by ID api', () => {
  it('givenPoperDetails_ShouldGetNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes/6165357e39139e12b1b2986f')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


// update note test cases
describe('Update notes api', () => {
  it('givenPoperDetails_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/61bb7ccb5aa989f5b63a3bc9')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('givenInvalidToken_ShouldUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put('/updatenotes/61bb7ccb5aa989f5b63a3bc9')
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
