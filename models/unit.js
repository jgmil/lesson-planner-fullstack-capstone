"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const unitSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: false
    },
    class_id: {
        type: String,
        required: false
    },
    title: {
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
    };
};

const Unit = mongoose.model('unit', unitSchema);

module.exports = Unit;
