"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const subject = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    }
});

subject.methods.serialize = function () {
    return {
        id: this._id,
        user_id: this.user_id,
        subjectName: this.subjectName
    };
};

const subject = mongoose.model('subject', subjectSchema);

module.exports = Subject;
