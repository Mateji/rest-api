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

router.post('/authenticate', function (req, res) {

    User.findOne({
        name: req.body.name
    }, function (err, user) {

        if (err) {
            throw err;
        }
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (!passwordHash.verify(req.body.password, user.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: '24h' // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    name: user.name,
                    group: user.group.name
                });
            }

        }

    });
});

module.exports = router;