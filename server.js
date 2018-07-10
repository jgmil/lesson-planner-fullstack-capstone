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
app.post('/subject/create', (req, res, next) => {
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
            return res.json(item);
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
app.get('/subjects/:user', function (req, res) {
    Subject
        .find()
        .sort('subjectName')
        .then(function (entries) {
            let subjectOutput = [];
            subjects.map(function (subject) {
                if (subject.user == req.params.user) {
                    subjectOutput.push(entry);
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

// DELETE ----------------------------------------
// deleting a subject by id
app.delete('/subject/:id', function (req, res) {
    Subject.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// -------------UNIT ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new entry
app.post('/entry/create', (req, res) => {
    let date = req.body.date;
    let intention = req.body.intention;
    let mood = req.body.mood;
    let medType = req.body.medType;
    let medLength = req.body.medLength;
    let user = req.body.user;
    let feeling = req.body.feeling;
    let notes = req.body.notes;
    let reflection = req.body.reflection;
    let gratitude = req.body.gratitude;

    Entry.create({
        user,
        date,
        intention,
        mood,
        medType,
        medLength,
        feeling,
        notes,
        reflection,
        gratitude
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Entry for \`${date}\` added.`);
            return res.json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/entry/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['intention', 'mood', 'medType', 'medLength', 'feeling', 'notes', 'reflection', 'gratitude'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Entry
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (achievement) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's entries
app.get('/entries/:user', function (req, res) {
    Entry
        .find()
        .sort('date')
        .then(function (entries) {
            let entryOutput = [];
            entries.map(function (entry) {
                if (entry.user == req.params.user) {
                    entryOutput.push(entry);
                }
            });
            res.json({
                entryOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single entry by id
app.get('/entry/:id', function (req, res) {
    Entry
        .findById(req.params.id).exec().then(function (entry) {
            return res.json(entry);
        })
        .catch(function (entry) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting an entry by id
app.delete('/entry/:id', function (req, res) {
    Entry.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// -------------LESSON ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new entry
app.post('/entry/create', (req, res) => {
    let date = req.body.date;
    let intention = req.body.intention;
    let mood = req.body.mood;
    let medType = req.body.medType;
    let medLength = req.body.medLength;
    let user = req.body.user;
    let feeling = req.body.feeling;
    let notes = req.body.notes;
    let reflection = req.body.reflection;
    let gratitude = req.body.gratitude;

    Entry.create({
        user,
        date,
        intention,
        mood,
        medType,
        medLength,
        feeling,
        notes,
        reflection,
        gratitude
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Entry for \`${date}\` added.`);
            return res.json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/entry/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['intention', 'mood', 'medType', 'medLength', 'feeling', 'notes', 'reflection', 'gratitude'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Entry
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (achievement) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's entries
app.get('/entries/:user', function (req, res) {
    Entry
        .find()
        .sort('date')
        .then(function (entries) {
            let entryOutput = [];
            entries.map(function (entry) {
                if (entry.user == req.params.user) {
                    entryOutput.push(entry);
                }
            });
            res.json({
                entryOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single entry by id
app.get('/entry/:id', function (req, res) {
    Entry
        .findById(req.params.id).exec().then(function (entry) {
            return res.json(entry);
        })
        .catch(function (entry) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting an entry by id
app.delete('/entry/:id', function (req, res) {
    Entry.findByIdAndRemove(req.params.id).exec().then(function (entry) {
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
