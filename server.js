var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),

    jwt = require('jsonwebtoken'),
    config = require('./config'),
    User = require('./UserSchema'),
    UserController = require('./UserController');

// config
var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', UserController);

app.use(morgan('dev'));

var server = app.listen(port, function () {
    console.log('Express server listening on port', port);
});