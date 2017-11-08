/**
* @author Maté 'Mateji' Intemann <mate.intemann@gmail.com>
*/

'use strict';

var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    name: String,
    description: String
}, { toJSON: { virtuals: true } });
GroupSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'group',
    justOne: false
});

mongoose.model('Group', GroupSchema);

module.exports = mongoose.model('Group');