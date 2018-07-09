"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const classNameSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    className: {
        type: String,
        required: true
    }
});

classNameSchema.methods.serialize = function () {
    return {
        id: this._id,
        user_id: this.user_id,
        className: this.className
    };
};

const className = mongoose.model('ClassName', classNameSchema);

module.exports = ClassName;
