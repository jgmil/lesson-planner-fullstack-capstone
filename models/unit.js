"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const unitSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: false
    },
    class_id: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    }
});

unitSchema.methods.serialize = function () {
    return {
        id: this._id,
        user_id: this.user_id,
        class_id: this.class_id,
        title: this.title,
        desc: this.desc
    };
};

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
