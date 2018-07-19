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
const Lesson = require('../models/lesson');
const Unit = require('../models/unit');
const Subject = require('../models/subject');
const User = require('../models/user');

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

describe('Subject CRUD operations', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    it('should create a new subject', function () {
        return chai.request(app)
            .post('/subject/create')
            .send({
                user_id: "5b3f90e85b127b2affb8d557",
                subjectName: "Test subject",
            })
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
                //                done();
            });
    });

    it('should get info about user and their subects', function () {
        return chai.request(app).get('/subjects/user').then(function (res) {
            res.should.be.json;
            res.body.should.be.a('object');

        });
    });
    it('should delete a specific subject', function () {
        return chai.request(app).delete('/subject/5b4bfd9c92198958068ae905').then(function (res) {
            res.should.have.status(204);
        });
    });
    after(function () {
        return closeServer();
    });
});

describe('Unit CRUD operations', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    it('should create a new unit', function () {
        return chai.request(app)
            .post('/unit/create')
            .send({
                user_id: "5b3f90e85b127b2affb8d557",
                subjectName: "Test subject",
                title: "Unit Title",
                class_id: "5b4bfd9c92198958068ae905",
            })
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
                //                done();
            });
    });

    it('should get info about user and their units', function () {
        return chai.request(app).get('/units/user').then(function (res) {
            res.should.be.json;
            res.body.should.be.a('object');

        });
    });
    it('should delete a specific unit', function () {
        return chai.request(app).delete('/unit/5b4c02986838a8583fa72f98').then(function (res) {
            res.should.have.status(204);
        });
    });
    after(function () {
        return closeServer();
    });
});

describe('Lesson CRUD operations', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    it('should create a new lesson', function () {
        return chai.request(app)
            .post('/lesson/create')
            .send({
                user_id: "5b3f90e85b127b2affb8d557",
                title: "Lesson Title",
                subject_id: "5b4bfd9c92198958068ae905",
                unit_id: "5b4c02986838a8583fa72f98",
                day: "3",
                stnds: "Standards: good ones",
                learningTargets: "Learning Targets: ",
                lessonDetails: "Lesson Details: ",
                assessment: "Assessment: ",
                homework: "Independent Practice/Homework: ",
                notes: "Notes: ",
                reflection: "Reflection: "
            })
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
                //                done();
            });
    });

    it('should get info about user and their lessons', function () {
        return chai.request(app).get('/lessons/user').then(function (res) {
            res.should.be.json;
            res.body.should.be.a('object');

        });
    });
    it('should delete a specific lesson', function () {
        return chai.request(app).delete('/lesson/5b4fd27b3999667171ff57b2').then(function (res) {
            res.should.have.status(204);
        });
    });
    after(function () {
        return closeServer();
    });
});
