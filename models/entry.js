"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const entrySchema = new mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    intention: {
        type: String,
        required: false
    },
    mood: {
        type: String,
        required: false
    },
    medType: {
        type: String,
        required: false
    },
    medLength: {
        type: String,
        required: false
    },
    feeling: {
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
    },
    gratitude: {
        type: String,
        required: false
    }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
