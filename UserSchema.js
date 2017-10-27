'use strict';
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        var hashedPassword = passwordHash.generate(user.password);
        if (hashedPassword) {
            user.password = hashedPassword;
            next();
        } else {
            next('Error hashing password.');
        }
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(pw, cb) {
    if (!passwordHash.verify(pw, this.password)) {
        return cb('ERROR');
    }
    cb(null, this);
};

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');