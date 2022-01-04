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
            .post('/addlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Gives true when token is verify', (done) => {
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
    it('Should Give false when token is not verify', (done) => {
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
    it('If payload of data is validated then it should give true', (done) => {
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
    it('When service layer is giving response, should return true', (done) => {
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
    it('When model layer is giving response, should return true', (done) => {
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
    it('When note is belong to same user, it should return true', (done) => {
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
    it('When the label belong to user, it should give true', (done) => {
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
    it('When note added into existing label, it should give true', (done) => {
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
    it('When label is created, it should give true', (done) => {
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

describe('get label api ', () => {
    it('getLabel_checking_server', (done) => {
        chai
            .request(server)
            .get('/getlabel')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Should give true, when token is verified', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .get('/getlabel')
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
            .get('/getlabel')
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
            .get('/getlabel')
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
            .get('/getlabel')
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
            .get('/getlabel')
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
            .get('/getlabel')
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
            .get('/getlabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Should Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken;
        chai
            .request(server)
            .get('/getlabel/:id')
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
            .get('/getlabel/:id')
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
            .get('/getlabel/61c2e271a2aa33d1c97253e3')
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
            .get('/getlabel/61c2e271a2aa33d1c97253e3')
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
            .get('/getlabel/61c2e271a2aa33d1c97253e3')
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
            .get('/getlabel/61c2e271a2aa33d1c97253e3')
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
            .put('/updatelabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .put('/updatelabel/:id')
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
            .put('/updatelabel/:id')
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
            .put('/updatelabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('When service layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .put('/updatelabel/:id')
            .set({ authorization: token })
            .send({ labelName: "Utkarsh" })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('When model layer is giving response, should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .put('/updatelabel/:id')
            .set({ authorization: token })
            .send({ labelName: "Utkarsh" })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('When label is updated, should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .put('/updatelabel/:id')
            .set({ authorization: token })
            .send({ labelName: "Utkarsh" })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});

describe('Delete labelById API ', () => {
    it.only('deleteLabelByID_checking_server', (done) => {
        chai
            .request(server)
            .delete('/deletelabel/:id')
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it.only('Gives true when token is verify', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/deletelabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('Gives false when token is not verify', (done) => {
        const token = labelDbs.label.invalidToken
        chai
            .request(server)
            .delete('/deletelabel/:id')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it.only('If payload of data is validated then it should give true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/deletelabel/61d3e8f85d3cd1e966595950')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('When service layer is giving response, it should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/deletelabel/61d3e8f85d3cd1e966595950')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('When model layer is giving response, it should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/deletelabel/61d3e028ba7be5e9ace71287')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it.only('When label is deleted, it should return true', (done) => {
        const token = labelDbs.label.validToken
        chai
            .request(server)
            .delete('/deletelabel/61d3e028ba7be5e9ace71287')
            .set({ authorization: token })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});