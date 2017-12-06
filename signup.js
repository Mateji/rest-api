/**
* @author Maté 'Mateji' Intemann <mate.intemann@gmail.com>
*/

'use strict';

var express = require('express'),
    app = require('./app'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    User = require('./Schema/UserSchema'),
    passwordHash = require('password-hash');

router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({message: 'Please provide a username and a password.'});
    } else {
        var newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        return User.create(newUser).then(function () {
            res.status(201).json({message: 'Account created!'});
        });
    }
});

module.exports = router;