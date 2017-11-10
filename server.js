'use strict';
var express = require('express'),
    app = require('./app'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    UserController = require('./Controllers/UserController'),
    GroupController = require('./Controllers/GroupController'),
    authenticate = require('./authenticate'),
    apiRoutes = express.Router(),
    jwt = require('jsonwebtoken'),
    cors = require('cors');

// config
var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/', authenticate);

apiRoutes.use(function(req, res, next) {
    var token = req.headers.authorization.substring(7);

    if (token) {

        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
app.use('/', apiRoutes);
app.use('/users', UserController);
app.use('/groups', GroupController);


app.use(morgan('dev'));

var server = app.listen(port, function () {
    console.log('Express server listening on port', port);
});