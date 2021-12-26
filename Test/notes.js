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
    it('givenCreateNotes_inValidToken_With_Undifined_Data', (done) => {
        const token = noteDB.notes.invalidToken;
        chai
            .request(server)
            .post('/createnotes')
            .set({ authorization: token })
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('givenNotes_InvalidToken_is Authentic Request', (done) => {
        const token = noteDB.notes.invalidToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: noteDB.notes.description
        };
        chai
            .request(server)
            .post('/createnotes')
            .set({ authorization: token })
            .send(createNotes)
            .end((err, res) => {
                if (err) {
                    res.should.have.status(500)
                }
                res.should.have.status(400);
                done();
            });
    });
    it('givenNotes_ValidToken_Schema is validated or not_shouldCreated', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: noteDB.notes.title,
            description: faker.lorem.word()
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
    it('givenNotes_InValidToken_shouldNotCreated with Payload', (done) => {
        const token = noteDB.notes.invalidToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        };
        chai
            .request(server)
            .post('/createnotes')
            .set({ authorization: token })
            .send(createNotes)
            .end((err, res) => {
                if (err) {
                    res.should.have.status(500);
                }
                res.should.have.status(400);
                done();
            });
    });
    it('givenNotes_ValidToken_shouldNotCreated with Payload', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        }
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
    it('Should return true from CreateNoteApi Service Layer', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        }
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
    it('Should return true from CreateNoteApi Model Layer ', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        }
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
    it('Should return true from Model Layer noteiscreated, return appropriate response', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        }
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
    it('Should return true from Model Layer .save is saving data', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        }
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
});

describe('get note api', () => {
    it('GetAll_notes_ApplyingInValidToken', (done) => {
        const token = noteDB.notes.invalidToken
        chai
            .request(server)
            .get('/getnotes')
            .set({ authorization: token })
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('GetAll_notes_Applying_ValidToken', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('GetAllNotes_With_inValidToken_is not Authentic', (done) => {
        const token = noteDB.notes.invalidToken;
        chai
            .request(server)
            .get('/getnotes')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('GetAllNotes_validToken_is Authentic Request', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes')
            .set({ authorization: token })
            .end((err, res) => {
                if (err) {
                    res.should.have.status(400);
                }
                res.should.have.status(201);
                done();
            });
    });
    it('GetAllNotes_validToken_Checking Service Response', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('GetALLNotes_validToken_Checking from Model Layer Response', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('gettinganotes_validToken_Checking Response .find', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});

describe('Get Note By Id API', () => {
    it('Should return true when it is a valid Token ', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Should return false When it is invalid Token', (done) => {
        const token = noteDB.notes.invalidToken;
        chai
            .request(server)
            .get('/getnotes/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('If token is verified then given id should be validated', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Checking the response of the service from the Valid Token', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Checking the Response from Model layer from Valid Token', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Checking the UserID from Collection using .findOne Method', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('From Id Verifying the Note by using .findOne Method', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .get('/getnotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe('Update notes API', () => {
    it.only('UpdateNotesById_by_checking_server_error', (done) => {
        chai
            .request(server)
            .put('/updatenotes/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it.only('validToken_should give true when it is valid entry of token', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .put('/updatenotes/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('InvalidToken_should give false when it is invalid entry of token', (done) => {
        const token = noteDB.notes.invalidToken;
        chai
            .request(server)
            .put('/updatenotes/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it.only('Should give true when it is validate with the given id', (done) => {
        const token = noteDB.notes.validToken;
        chai
            .request(server)
            .put('/updatenotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('ShouldUpdateNote Using Fake Data, when givenPoperDetails_', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        };
        chai
            .request(server)
            .put('/updatenotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .send(createNotes)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('Should return true from UpdateNote Service Layer, return appropriate response', (done) => {
        const token = noteDB.notes.validToken;
        const createNotes = {
            title: faker.lorem.word(),
            description: faker.lorem.word()
        };
        chai
            .request(server)
            .put('/updatenotes/61ba2f35d2b53902124786b1')
            .set({ authorization: token })
            .send(createNotes)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});