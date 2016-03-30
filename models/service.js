'use strict';

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let Service = new Schema({
    name: String
});

module.exports = mongoose.model('Service', Service);
