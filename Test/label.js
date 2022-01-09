const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');
chai.use(chaiHttp);
const labelDbs = require('./label.json');
const { expect } = require('chai');
chai.should();

describe('Add label by id api ', () => {
    it('AddLabelById_by_checking_server', (done) => {
        chai
            .request(server)
            .post('/label/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .post('/label/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('Should Give false when token is not verify', (done) => {
        const token = labelDbs.label.invalidToken
        chai
            .request(server)
            .post('/label/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('If payload of data is validated then it should give true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/label/:id')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it('When service layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it('When model layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it('When note is belong to same user, it should return true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it('When the label belong to user, it should give true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it('When note added into existing label, it should give true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
    it('When label is created, it should give true', (done) => {
        const token = labelDbs.label.validToken;
        const labelName = {
            labelname: faker.lorem.word()
        }
        chai
            .request(server)
            .post('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });
});

describe('get label api ', () => {
    it('getLabel_checking_server', (done) => {
        chai
            .request(server)
            .get('/label')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Should give true, when token is verified', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .get('/label')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Should give false, when token is not verified', (done) => {
        const token = labelDbs.label.invalidToken
        chai
            .request(server)
            .get('/label')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('If payload of data is validated then it should give true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .get('/label')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('When service layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .get('/label')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('When model layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .get('/label')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('When label is fetched successfully, then it should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .get('/label')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe('get labelById API ', () => {
    it('getLabelByID_checking_server', (done) => {
        chai
            .request(server)
            .get('/label/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Should Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken;
        chai
            .request(server)
            .get('/label/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('Should Gives false when token is not verified', (done) => {
        const token = labelDbs.label.invalidToken;
        chai
            .request(server)
            .get('/label/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('If payload of data is validated then it should give true', (done) => {
        const token = labelDbs.label.validToken;
        chai
            .request(server)
            .get('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('When service layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken;
        chai
            .request(server)
            .get('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('When model layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken;
        chai
            .request(server)
            .get('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('When label is fetched, should return true', (done) => {
        const token = labelDbs.label.validToken;
        chai
            .request(server)
            .get('/label/61d891e1655a58d729dd63b6')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe('Update labelById API ', () => {
    it('updateLabelByID_checking_server', (done) => {
        chai
            .request(server)
            .put('/label/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .put('/label/61da8636385b8a72f229dd1f')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('Gives false when token is not verify', (done) => {
        const token = labelDbs.label.invalidToken
        chai
            .request(server)
            .put('/label/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('If payload of data is validated then it should give true', (done) => {
        const token = labelDbs.label.validToken
        const labelName = {
            labeldata: faker.lorem.word()
        }
        chai
            .request(server)
            .put('/label/61da8636385b8a72f229dd1f')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('When service layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken
        const labelName = {
            labeldata: faker.lorem.word()
        }
        chai
            .request(server)
            .put('/label/61da8636385b8a72f229dd1f')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('When model layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken
        const labelName = {
            labeldata: faker.lorem.word()
        }
        chai
            .request(server)
            .put('/label/61da8636385b8a72f229dd1f')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('When label is updated, should return true', (done) => {
        const token = labelDbs.label.validToken
        const labelName = {
            labeldata: faker.lorem.word()
        }
        chai
            .request(server)
            .put('/label/61da8636385b8a72f229dd1f')
            .set({ authorization: token })
            .send(labelName)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});

describe('Delete labelById API ', () => {
    it('deleteLabelByID_checking_server', (done) => {
        chai
            .request(server)
            .delete('/label/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/label/61da867e17c4536206fa35c0')
            .set({ authorization: token })
            .end((err, res) => {
                if (err) {
                    console.log("plz check your credential");
                    return done();
                }
                res.should.have.status(200);
                return done();
            });
    });
    it('Gives false when token is not verify', (done) => {
        const token = labelDbs.label.invalidToken
        chai
            .request(server)
            .delete('/label/61da866017c4536206fa35ba')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('If payload of data is validated then it should give true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/label/61da866017c4536206fa35ba')
            .set({ authorization: token })
            .end((err, res) => {
                if (err) {
                    console.log("plz check your credential");
                    return done();
                }
                res.should.have.status(200);
                return done();
            });
    });
    it('When service layer is giving response, it should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/label/61da866017c4536206fa35ba')
            .set({ authorization: token })
            .end((err, res) => {
                if (err) {
                    console.log("plz check your credential");
                    return done();
                }
                res.should.have.status(200);
                return done();
            });
    });
    it('When model layer is giving response, it should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/label/61da866017c4536206fa35ba')
            .set({ authorization: token })
            .end((err, res) => {
                if (err) {
                    console.log("plz check your credential");
                    return done();
                }
                res.should.have.status(200);
                return done();
            });
    });
    it('When label is deleted, it should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/label/61da866017c4536206fa35ba')
            .set({ authorization: token })
            .end((err, res) => {
                if (err) {
                    console.log("plz check your credential");
                    return done();
                }
                res.should.have.status(200);
                return done();
            });
    });
});