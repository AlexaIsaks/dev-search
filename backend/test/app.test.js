let expect = require("chai").expect;
let request = require("request");

// Test that status and content returns correctly
describe("Status and content returns correctly", function () {
  // Home page 
  describe("'/api/:username' (Home page)", function () {
    beforeEach(function (done) {
      this.timeout(10000);
      setTimeout(done, 2500);
    });

    // Status should return 200
    it("status", function (done) {
      request("http://localhost:8080/api/Andrew", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    // Content should return the user's name
    it("content", function (done) {
      request("http://localhost:8080/api/fabpot", function (error, response, body) {
        const result = JSON.parse(body);
        // From the first result in the array, retrieve the name of the user
        const firstUserName = result[0]["name"];
        expect(firstUserName).to.equal("Fabien Potencier");
        done();
      });
    });
  });
});