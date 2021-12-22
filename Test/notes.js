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

  it('givenGetNotes_whenInvalidToken_shouldNotbeGet', (done) => {
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
  it.only('given token should be valid token', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes/61bf662d2cc8f31afe6ebb41')
      .set({ authorization: token })
      .send(token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it.only('given token should be Invalid token', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .get('/getnotes/61bf662d2cc8f31afe6ebb41')
      .set({ authorization: token })
      .send(token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it.only('givenPoperDetails_ShouldGetNoteId', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes/61bf662d2cc8f31afe6ebb41')
      .set({ authorization: token })
      .send(token, '61bf662d2cc8f31afe6ebb41')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it.only('givenImPoperDetails_ShouldGetNote', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it.only("Should return true , return appropriate response", (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it.only("Should return false from GetNoteApi model, return appropriate response", (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token, '61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        return done();
      });
  });
  it.only("Should return true from GetNoteApi model layer  , return appropriate response", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(200);
        return done();
      });
  });
  it.only("Should return false from GetNoteApi model Layer  , return appropriate response", (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get('/getnotes/61c28a8516512bcec838cbbc')
      .set({ authorization: token })
      .send(token,'61c28a8516512bcec838cbbc')
      .end((err, res) => {
        res.should.have.status(400);
        return done();
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
        res.body.should.have.property('success').eql(true);
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

// delete note test cases
describe('delete notes api', () => {
  it('givenValidValidation_ShouldNotUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .delete('/deletenotes/61bcd82dbe523da96f5f2717')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        done();
      });
  });

  it.only('givenInValidValidation_ShouldNotUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .delete('/deletenotes/:id')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        done();
      });
  });

  it.only('givenInvalidValidValidation_ShouldNotUpdateNote', (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .delete('/deletenotes/:id')
      .set({ authorization: token })
      .send({ "id": "61bb7ccb5a89f5b63a3bc9" })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('success').eql(false);
        done();
      });
  });
});

