const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);
const redisServer = require("./redis.json");
chai.should();

describe("Implementing redis for get note by Id", () => {
  it("ShouldGetNote_when_PoperDetails_is_given", (done) => {
    const token = redisServer.redis.validToken;
    chai
      .request(server)
      .get("/getnotes/61d88e166aabfb3579a5c561")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Should_ Not_GetNote givenDetails_is_not_proper", (done) => {
    const token = redisServer.redis.invalidToken;
    chai
      .request(server)
      .get("/getnotes/61d88e166aabfb3579a5c561")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("Get label by ID api with redis", (done) => {
    const token = redisServer.redis.validToken;
    chai
      .request(server)
      .get("/getnotes/61d88e166aabfb3579a5c561")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
  it("ShouldGetnote_when_given_Details_is_Proper", (done) => {
    const token = redisServer.redis.validToken;
    chai
      .request(server)
      .get("/getnotes/61d88e166aabfb3579a5c561")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});