"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const subjectSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    }
});

subjectSchema.methods.serialize = function () {
    return {
        id: this._id,
        user_id: this.user_id,
        subjectName: this.subjectName
    };
};

const Subject = mongoose.model('subject', subjectSchema);

module.exports = Subject;
