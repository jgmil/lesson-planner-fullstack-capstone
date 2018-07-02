// connect to db
// insert seed data into db
// make HTTP requests to API using the test client
// inspect the state of the db after request is made
// tear down the db

// using ES6 promises

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
// requiring in the js files from this app
const User = require('./models/user');
const Entry = require('./models/entry');

const {
    app,
    runServer,
    closeServer
} = require('../server');
// import TEST_DATABASE_URL from ('../config');
const {
    DATABASE_URL,
    TEST_DATABASE_URL
} = require('../config');
console.log(TEST_DATABASE_URL);

// chai
const should = chai.should();
chai.use(chaiHttp);

describe('Entry CRUD operations', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    it('should create a new entry text', function () {
        return chai.request(app).post('/entry/create').then(function (res) {
            res.should.be.json;
        });
    });

    it('should get info about user and their entries', function () {
        return chai.request(app).get('/entries/user').then(function (res) {
            res.should.be.json;
            res.body.should.be.a('object');

        });
    });
    it('should delete a specific entry', function () {
        return chai.request(app).delete('/entry/5afa3b4772d20a42255b17c6').then(function (res) {
            res.should.have.status(204);
        });
    });
    after(function () {
        return closeServer();
    });
});
