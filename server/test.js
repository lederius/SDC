let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
var expect = chai.expect;
const app = require("../server/newServer.js");
chai.use(chaiHttp);

describe("/GET/questions/:product_id", (done) => {
  it("it SHOULD GET question with questions from product 37323", function() {
    console.log('running test')
      chai.request(app)
        .get("/questions/37323")
        .end(function(err, res) {
          expect(res).to.have.status(201);
          done();
          });
    console.log('test finished');
  });
});