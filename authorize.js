/**
* @author Maté 'Mateji' Intemann <mate.intemann@gmail.com>
*/

'use strict';

var express = require('express'),
    User = require('./Schema/UserSchema');
var app = express();

var authorize = {};

authorize.andRestrictToSelf = function (req, res, next) {
    // If our authenticated user is the user we are viewing
    // then everything is fine :)
    if (req.authenticatedUser.id == req.user.id) {
        next();
    } else {
        // You may want to implement specific exceptions
        // such as UnauthorizedError or similar so that you
        // can handle these can be special-cased in an error handler
        // (view ./examples/pages for this)
        next(new Error('Unauthorized'));
    }
};

authorize.andRestrictTo = function (group) {
    return function (req, res, next) {
        if (req.user.group == group) {
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    }
};

// function authorize (req, res, next) {

//     //if (req.user has role)
//         next();
//     // else 
//         next(new Error('Unauthorized'));
// }
module.exports = authorize;