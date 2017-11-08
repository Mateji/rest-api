/**
* @author Maté 'Mateji' Intemann <mate.intemann@gmail.com>
*/

'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('../Schema/UserSchema'),
    Group = require('../Schema/GroupSchema');

router.post('/', function (req, res) {
    Group.create({
        name: req.body.name,
        description: req.body.description
    }, function (err, group) {
        if (err) {
            return res.status(500).send('There was a problem adding the information to the database.');
        }
        res.status(200).send(group);
    });
});

router.get('/', function (req, res) {
    Group.find({}).populate('users').exec( function (err, groups) {
        if (err) {
            return res.status(500).send('There was a problem finding the groups.');
        }
        res.status(200).send(groups);
    });
});

router.get('/:id', function (req, res) {
    Group.findById(req.params.id, function (err, group) {
        if (err) {
            return res.status(500).send('There was a problem finding the group.');
        }
        if (!group) {
            return res.status(404).send('No group found.');
        }
        res.status(200).send(group);
    });
});

router.delete('/:id', function (req, res) {
    Group.findByIdAndRemove(req.params.id, function (err, group) {
        if (err) {
            return res.status(500).send('There was a problem deleting the group.');
        }
        res.status(200).send('Group ' + group.name + ' was deleted.');
    });
});

router.put('/:id', function (req, res) {
    Group.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, group) {
        if (err) {
            return res.status(500).send('There was a problem updating the group.');
        }
        res.status(200).send(group);
    });
});

module.exports = router;