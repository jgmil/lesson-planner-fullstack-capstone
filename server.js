const Lesson = require('./models/lesson');
const Unit = require('./models/unit');
const Subject = require('./models/subject');
const User = require('./models/user');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {
    //take the input from the payload
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    //exclude spaces from the username and password
    username = username.trim();
    password = password.trim();
    //search if the user exists in the databse
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            //if the database search failed...
            if (err) {
                //return an error
                return res.status(500).json({
                    message: "Database connection failed."
                });
            }
            //if that user is not in the database...
            if (!items) {
                //generate the encryption key (Salt)
                bcrypt.genSalt(10, (err, salt) => {
                    //if the encryption key fails...
                    if (err) {
                        //display an error
                        return res.status(500).json({
                            message: 'Encryption key failed'
                        });
                    }
                    //using the encryption key above, encrypt the password (hash)
                    bcrypt.hash(password, salt, (err, hash) => {
                        //if encrypting the password fails...
                        if (err) {
                            //display an error
                            return res.status(500).json({
                                message: 'Password encryption failed'
                            });
                        }
                        //add the new user to the database
                        User.create({
                            username,
                            password: hash,
                            name,
                        }, (err, item) => {
                            //if adding to the database fails...
                            if (err) {
                                //display an error
                                return res.status(500).json({
                                    message: 'Adding user to the database failed'
                                });
                            }
                            //if the user is created...
                            if (item) {
                                //return the created user
                                console.log(`User \`${username}\` created.`);
                                return res.json(item);
                            }
                        });
                    });
                });
            }
            //if the user exists in the database...
            else {
                //return an error
                return res.status(401).json({
                    message: "User already exists!"
                });
            };
        });
});

// signing in a user
app.post('/users/signin', function (req, res) {
    //take the values from the payload
    const user = req.body.username;
    const pw = req.body.password;
    //search in the database for a user with the existing username
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            //if the database search failed...
            if (err) {
                //return an error
                return res.status(500).json({
                    message: "Database connection failed."
                });
            }
            //if that user is not in the database...
            if (!items) {
                //return an error
                return res.status(401).json({
                    message: "User not found!"
                });
            } else {
                //if the user is found, validate the password
                items.validatePassword(req.body.password, function (err, isValid) {
                    //if password validation failed...
                    if (err) {
                        //display an error
                        console.log('There was an error validating the password.');
                    }
                    //if the password is not valid...
                    if (!isValid) {
                        //display an error
                        return res.status(401).json({
                            message: "Password not valid."
                        });
                    }
                    //if the username and password are valid return the username
                    else {
                        return res.json(items);
                    }
                });
            };
        });
});


// -------------SUBJECT ENDPOINTS------------------------------------
// POST -----------------------------------------
// creating a new subject
app.post('/subject/create', (req, res) => {
    const {
        subjectName,
        user_id
    } = req.body;
    console.log(req.body);

    Subject.create({
        subjectName,
        user_id
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`${subjectName} added.`);
            return res.status(201).json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/subject/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['subjectName'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Subject
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (subject) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's subjects
app.get('/subjects/:user_id', function (req, res) {
    Subject
        .find()
        .sort('subjectName')
        .then(function (subjects) {
            let subjectOutput = [];
            subjects.map(function (subject) {
                if (subject.user_id == req.params.user_id) {
                    subjectOutput.push(subject);
                }
            });
            res.json({
                subjectOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single subject by id
app.get('/subject/:id', function (req, res) {
    Subject
        .findById(req.params.id).exec().then(function (subject) {
            return res.json(subject);
        })
        .catch(function (subject) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting a subject by id
app.delete('/subject/:id', function (req, res) {
    Subject.findByIdAndRemove(req.params.id).exec().then(function (subject) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// -------------UNIT ENDPOINTS------------------------------------------------
//POST-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
//creating a new unit
app.post('/unit/create', (req, res) => {

    const {
        title,
        user_id,
        class_id,
        desc
    } = req.body;
    console.log(req.body);

    Unit.create({
        title,
        user_id,
        class_id,
        desc
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`${title} added.`);
            return res.status(201).json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/unit/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['title', 'desc', 'class_id'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Unit
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (unit) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's units
app.get('/units/:user_id', function (req, res) {
    Unit
        .find()
        .sort('title')
        .then(function (units) {
            let unitOutput = [];
            units.map(function (unit) {
                if (unit.user_id == req.params.user_id) {
                    unitOutput.push(unit);
                }
            });
            res.json({
                unitOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single unit by id
app.get('/unit/:id', function (req, res) {
    Unit
        .findById(req.params.id).exec().then(function (unit) {
            return res.json(unit);
        })
        .catch(function (unit) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting a unit by id
app.delete('/unit/:id', function (req, res) {
    Unit.findByIdAndRemove(req.params.id).exec().then(function (unit) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

//delete many units by subject id

app.delete('/units/:id', function (req, res) {
    console.log(req.params.id);
    Unit.deleteMany({
        class_id: req.params.id
    }).exec().then(function (unit) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});





// -------------LESSON ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new lesson

app.post('/lesson/create', (req, res) => {

    const {
        user_id,
        title,
        subject_id,
        unit_id,
        day,
        stnds,
        learningTargets,
        lessonDetails,
        assessment,
        homework,
        notes,
        reflection
    } = req.body;
    console.log(req.body);

    Lesson.create({
        user_id,
        title,
        subject_id,
        unit_id,
        day,
        stnds,
        learningTargets,
        lessonDetails,
        assessment,
        homework,
        notes,
        reflection
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Lesson \`${title}\` added.`);
            return res.status(201).json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/lesson/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['title', 'desc', 'day', 'stnds', 'learningTargets', 'lessonDetails', 'assessment', 'homework', 'notes', 'reflection'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Lesson
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (lesson) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's lessons
app.get('/lessons/:user_id', function (req, res) {
    Lesson
        .find()
        .sort('day')
        .then(function (lessons) {
            let lessonOutput = [];
            lessons.map(function (lesson) {
                if (lesson.user_id == req.params.user_id) {
                    lessonOutput.push(lesson);
                }
            });
            res.json({
                lessonOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single lesson by id
app.get('/lesson/:id', function (req, res) {
    Lesson
        .findById(req.params.id).exec().then(function (lesson) {
            return res.json(lesson);
        })
        .catch(function (lesson) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting a lesson by id
app.delete('/lesson/:id', function (req, res) {
    Lesson.findByIdAndRemove(req.params.id).exec().then(function (lesson) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

//delete many lessons by unit id

app.delete('/lessons/:id', function (req, res) {
    console.log(req.params.id);
    Lesson.deleteMany({
        unit_id: req.params.id
    }).exec().then(function (unit) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});



exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
