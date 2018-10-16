var assert = require('assert');
// Unit test file created by Jacky Ou
/*
 * This is the testing file powered by Mocha and Chai framework. I have written
 * few codes.
*/

var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var request = require('request');
var mysql = require('mysql');


describe("Web Server Functionality", function() {
  it("Main Page Response Status", function(done) {
    request('http://localhost:5000', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe("User Response Functionality", function() {
  it("Self-Happiness Data", function() {
    
  });
});

describe("Testing MySQL Database Connection", function() {
  it("MySQL Server Available", function(done) {
    mysql.connect(function(error, result) {
      if (err) {
        done(err);
        return;
      }
      
      expect(result).to.equal("SQL CONNECT SUCCESSFUL.");
      done();
    });
  });
});