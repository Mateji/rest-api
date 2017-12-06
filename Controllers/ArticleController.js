/**
* @author Maté 'Mateji' Intemann <mate.intemann@gmail.com>
*/

'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('../Schema/UserSchema'),
    Article = require('../Schema/ArticleSchema');

router.post('/', function (req, res) {
    Article.create({
        title: req.body.title,
        articleText: req.body.articleText,
        author: req.body.author,
        createdOn: Date.now()
    }, function (err, article) {
        if (err) {
            return res.status(500).send('There was a problem adding the information to the database.');
        }
        res.status(200).send(article);
    });
});

router.get('/', function (req, res) {
    Article.find({}).populate('users').exec(function (err, articles) {
        if (err) {
            return res.status(500).send('There was a problem finding the articles.');
        }
        res.status(200).send(articles);
    });
});

router.get('/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            return res.status(500).send('There was a problem finding the article.');
        }
        if (!article) {
            return res.status(404).send('No article found.');
        }
        res.status(200).send(article);
    });
});

router.delete('/:id', function (req, res) {
    Article.findByIdAndRemove(req.params.id, function (err, article) {
        if (err) {
            return res.status(500).send('There was a problem deleting the article.');
        }
        res.status(200).send('Article ' + article.name + ' was deleted.');
    });
});

router.put('/:id', function (req, res) {
    Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, article) {
        if (err) {
            return res.status(500).send('There was a problem updating the article.');
        }
        res.status(200).send(article);
    });
});

module.exports = router;