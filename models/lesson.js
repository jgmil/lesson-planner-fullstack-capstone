"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const lessonSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    class_id: {
        type: String,
        required: true
    },
    unit_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    stnds: {
        type: Date,
        required: false
    },
    learningTargets: {
        type: String,
        required: false
    },
    lessonDetails: {
        type: String,
        required: false
    },
    assessment: {
        type: String,
        required: false
    },
    homework: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    reflection: {
        type: String,
        required: false
    }
});

lessonSchema.methods.serialize = function () {
    return {
        id: this._id,
        user_id: this.user_id,
        class_id: this.class_id,
        unit_id: this.unit_id,
        title: this.title,
        stnds: this.stnds,
        learningTargets: this.learningTargets,
        lessonDetails: this.lessonDetails,
        assessment: this.assessment,
        homework: this.homework,
        notes: this.notes,
        reflection: this.reflection
    };
};

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
