/**
* @author Maté 'Mateji' Intemann <mate.intemann@gmail.com>
*/

'use strict';

var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: String,
    articleText: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: Date
});

mongoose.model('Article', ArticleSchema);

module.exports = mongoose.model('Article');